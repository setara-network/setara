package keeper

import (
	"context"

	"setara/x/document/types"

	errorsmod "cosmossdk.io/errors"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (q queryServer) DocumentByHash(ctx context.Context, req *types.QueryDocumentByHashRequest) (*types.QueryDocumentByHashResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	if req.Hash == "" {
		return nil, status.Error(codes.InvalidArgument, "hash cannot be empty")
	}

	// Look up document index by hash
	docId, err := q.k.HashIndex.Get(ctx, req.Hash)
	if err != nil {
		return nil, errorsmod.Wrap(types.ErrDocNotFound, req.Hash)
	}

	doc, err := q.k.Document.Get(ctx, docId)
	if err != nil {
		return nil, errorsmod.Wrap(types.ErrDocNotFound, docId)
	}

	return &types.QueryDocumentByHashResponse{Document: &doc}, nil
}
