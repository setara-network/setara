package keeper

import (
	"context"
	"errors"

	"setara/x/organization/types"

	"cosmossdk.io/collections"
	"github.com/cosmos/cosmos-sdk/types/query"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (q queryServer) ListOrganization(ctx context.Context, req *types.QueryAllOrganizationRequest) (*types.QueryAllOrganizationResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	organizations, pageRes, err := query.CollectionPaginate(
		ctx,
		q.k.Organization,
		req.Pagination,
		func(_ string, value types.Organization) (types.Organization, error) {
			return value, nil
		},
	)
	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryAllOrganizationResponse{Organization: organizations, Pagination: pageRes}, nil
}

func (q queryServer) GetOrganization(ctx context.Context, req *types.QueryGetOrganizationRequest) (*types.QueryGetOrganizationResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	val, err := q.k.Organization.Get(ctx, req.Index)
	if err != nil {
		if errors.Is(err, collections.ErrNotFound) {
			return nil, status.Error(codes.NotFound, "not found")
		}

		return nil, status.Error(codes.Internal, "internal error")
	}

	return &types.QueryGetOrganizationResponse{Organization: val}, nil
}
