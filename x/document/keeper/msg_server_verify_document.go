package keeper

import (
	"context"

	"setara/x/document/types"

	errorsmod "cosmossdk.io/errors"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k msgServer) VerifyDocument(ctx context.Context, msg *types.MsgVerifyDocument) (*types.MsgVerifyDocumentResponse, error) {
	if _, err := k.addressCodec.StringToBytes(msg.Creator); err != nil {
		return nil, errorsmod.Wrap(err, "invalid authority address")
	}

	if msg.DocumentId == "" {
		return nil, errorsmod.Wrap(types.ErrDocNotFound, "document ID cannot be empty")
	}

	has, err := k.Document.Has(ctx, msg.DocumentId)
	if err != nil {
		return nil, err
	}
	if !has {
		return nil, errorsmod.Wrap(types.ErrDocNotFound, msg.DocumentId)
	}

	sdkCtx := sdk.UnwrapSDKContext(ctx)
	sdkCtx.EventManager().EmitEvent(
		sdk.NewEvent(
			"verify_document",
			sdk.NewAttribute("document_id", msg.DocumentId),
			sdk.NewAttribute("verifier", msg.Creator),
		),
	)

	return &types.MsgVerifyDocumentResponse{}, nil
}
