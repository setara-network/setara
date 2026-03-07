package keeper_test

import (
	"context"
	"strconv"
	"testing"

	"github.com/cosmos/cosmos-sdk/types/query"
	"github.com/stretchr/testify/require"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	"setara/x/organization/keeper"
	"setara/x/organization/types"
)

func createNOrganization(keeper keeper.Keeper, ctx context.Context, n int) []types.Organization {
	items := make([]types.Organization, n)
	for i := range items {
		items[i].Index = strconv.Itoa(i)
		items[i].Name = strconv.Itoa(i)
		items[i].Description = strconv.Itoa(i)
		items[i].IpfsEndpoint = strconv.Itoa(i)
		items[i].Admin = strconv.Itoa(i)
		items[i].IsActive = true
		_ = keeper.Organization.Set(ctx, items[i].Index, items[i])
	}
	return items
}

func TestOrganizationQuerySingle(t *testing.T) {
	f := initFixture(t)
	qs := keeper.NewQueryServerImpl(f.keeper)
	msgs := createNOrganization(f.keeper, f.ctx, 2)
	tests := []struct {
		desc     string
		request  *types.QueryGetOrganizationRequest
		response *types.QueryGetOrganizationResponse
		err      error
	}{
		{
			desc: "First",
			request: &types.QueryGetOrganizationRequest{
				Index: msgs[0].Index,
			},
			response: &types.QueryGetOrganizationResponse{Organization: msgs[0]},
		},
		{
			desc: "Second",
			request: &types.QueryGetOrganizationRequest{
				Index: msgs[1].Index,
			},
			response: &types.QueryGetOrganizationResponse{Organization: msgs[1]},
		},
		{
			desc: "KeyNotFound",
			request: &types.QueryGetOrganizationRequest{
				Index: strconv.Itoa(100000),
			},
			err: status.Error(codes.NotFound, "not found"),
		},
		{
			desc: "InvalidRequest",
			err:  status.Error(codes.InvalidArgument, "invalid request"),
		},
	}
	for _, tc := range tests {
		t.Run(tc.desc, func(t *testing.T) {
			response, err := qs.GetOrganization(f.ctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
				require.EqualExportedValues(t, tc.response, response)
			}
		})
	}
}

func TestOrganizationQueryPaginated(t *testing.T) {
	f := initFixture(t)
	qs := keeper.NewQueryServerImpl(f.keeper)
	msgs := createNOrganization(f.keeper, f.ctx, 5)

	request := func(next []byte, offset, limit uint64, total bool) *types.QueryAllOrganizationRequest {
		return &types.QueryAllOrganizationRequest{
			Pagination: &query.PageRequest{
				Key:        next,
				Offset:     offset,
				Limit:      limit,
				CountTotal: total,
			},
		}
	}
	t.Run("ByOffset", func(t *testing.T) {
		step := 2
		for i := 0; i < len(msgs); i += step {
			resp, err := qs.ListOrganization(f.ctx, request(nil, uint64(i), uint64(step), false))
			require.NoError(t, err)
			require.LessOrEqual(t, len(resp.Organization), step)
			require.Subset(t, msgs, resp.Organization)
		}
	})
	t.Run("ByKey", func(t *testing.T) {
		step := 2
		var next []byte
		for i := 0; i < len(msgs); i += step {
			resp, err := qs.ListOrganization(f.ctx, request(next, 0, uint64(step), false))
			require.NoError(t, err)
			require.LessOrEqual(t, len(resp.Organization), step)
			require.Subset(t, msgs, resp.Organization)
			next = resp.Pagination.NextKey
		}
	})
	t.Run("Total", func(t *testing.T) {
		resp, err := qs.ListOrganization(f.ctx, request(nil, 0, 0, true))
		require.NoError(t, err)
		require.Equal(t, len(msgs), int(resp.Pagination.Total))
		require.EqualExportedValues(t, msgs, resp.Organization)
	})
	t.Run("InvalidRequest", func(t *testing.T) {
		_, err := qs.ListOrganization(f.ctx, nil)
		require.ErrorIs(t, err, status.Error(codes.InvalidArgument, "invalid request"))
	})
}
