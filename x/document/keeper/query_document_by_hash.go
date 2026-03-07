package keeper

import (
	"context"

	"setara/x/document/types"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (q queryServer) DocumentByHash(ctx context.Context, req *types.QueryDocumentByHashRequest) (*types.QueryDocumentByHashResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	// TODO: Process the query

	return &types.QueryDocumentByHashResponse{}, nil
}
