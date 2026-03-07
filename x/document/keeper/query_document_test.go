package keeper_test

import (
	"context"
	"strconv"
	"testing"

	"github.com/cosmos/cosmos-sdk/types/query"
	"github.com/stretchr/testify/require"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	"setara/x/document/keeper"
	"setara/x/document/types"
)

func createNDocument(keeper keeper.Keeper, ctx context.Context, n int) []types.Document {
	items := make([]types.Document, n)
	for i := range items {
		items[i].Index = strconv.Itoa(i)
		items[i].Hash = strconv.Itoa(i)
		items[i].IpfsCid = strconv.Itoa(i)
		items[i].OrgId = strconv.Itoa(i)
		items[i].DocType = strconv.Itoa(i)
		items[i].Metadata = strconv.Itoa(i)
		items[i].Issuer = strconv.Itoa(i)
		items[i].Recipient = strconv.Itoa(i)
		items[i].IssuedAt = int64(i)
		_ = keeper.Document.Set(ctx, items[i].Index, items[i])
	}
	return items
}

func TestDocumentQuerySingle(t *testing.T) {
	f := initFixture(t)
	qs := keeper.NewQueryServerImpl(f.keeper)
	msgs := createNDocument(f.keeper, f.ctx, 2)
	tests := []struct {
		desc     string
		request  *types.QueryGetDocumentRequest
		response *types.QueryGetDocumentResponse
		err      error
	}{
		{
			desc: "First",
			request: &types.QueryGetDocumentRequest{
				Index: msgs[0].Index,
			},
			response: &types.QueryGetDocumentResponse{Document: msgs[0]},
		},
		{
			desc: "Second",
			request: &types.QueryGetDocumentRequest{
				Index: msgs[1].Index,
			},
			response: &types.QueryGetDocumentResponse{Document: msgs[1]},
		},
		{
			desc: "KeyNotFound",
			request: &types.QueryGetDocumentRequest{
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
			response, err := qs.GetDocument(f.ctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
				require.EqualExportedValues(t, tc.response, response)
			}
		})
	}
}

func TestDocumentQueryPaginated(t *testing.T) {
	f := initFixture(t)
	qs := keeper.NewQueryServerImpl(f.keeper)
	msgs := createNDocument(f.keeper, f.ctx, 5)

	request := func(next []byte, offset, limit uint64, total bool) *types.QueryAllDocumentRequest {
		return &types.QueryAllDocumentRequest{
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
			resp, err := qs.ListDocument(f.ctx, request(nil, uint64(i), uint64(step), false))
			require.NoError(t, err)
			require.LessOrEqual(t, len(resp.Document), step)
			require.Subset(t, msgs, resp.Document)
		}
	})
	t.Run("ByKey", func(t *testing.T) {
		step := 2
		var next []byte
		for i := 0; i < len(msgs); i += step {
			resp, err := qs.ListDocument(f.ctx, request(next, 0, uint64(step), false))
			require.NoError(t, err)
			require.LessOrEqual(t, len(resp.Document), step)
			require.Subset(t, msgs, resp.Document)
			next = resp.Pagination.NextKey
		}
	})
	t.Run("Total", func(t *testing.T) {
		resp, err := qs.ListDocument(f.ctx, request(nil, 0, 0, true))
		require.NoError(t, err)
		require.Equal(t, len(msgs), int(resp.Pagination.Total))
		require.EqualExportedValues(t, msgs, resp.Document)
	})
	t.Run("InvalidRequest", func(t *testing.T) {
		_, err := qs.ListDocument(f.ctx, nil)
		require.ErrorIs(t, err, status.Error(codes.InvalidArgument, "invalid request"))
	})
}
