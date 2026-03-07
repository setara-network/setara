package keeper

import (
	"context"
	"errors"

	"setara/x/document/types"

	"cosmossdk.io/collections"
	"github.com/cosmos/cosmos-sdk/types/query"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (q queryServer) ListDocument(ctx context.Context, req *types.QueryAllDocumentRequest) (*types.QueryAllDocumentResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	documents, pageRes, err := query.CollectionPaginate(
		ctx,
		q.k.Document,
		req.Pagination,
		func(_ string, value types.Document) (types.Document, error) {
			return value, nil
		},
	)
	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryAllDocumentResponse{Document: documents, Pagination: pageRes}, nil
}

func (q queryServer) GetDocument(ctx context.Context, req *types.QueryGetDocumentRequest) (*types.QueryGetDocumentResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	val, err := q.k.Document.Get(ctx, req.Index)
	if err != nil {
		if errors.Is(err, collections.ErrNotFound) {
			return nil, status.Error(codes.NotFound, "not found")
		}

		return nil, status.Error(codes.Internal, "internal error")
	}

	return &types.QueryGetDocumentResponse{Document: val}, nil
}
