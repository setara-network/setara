package keeper

import (
	"context"

	"setara/x/document/types"

	errorsmod "cosmossdk.io/errors"
)

func (k msgServer) VerifyDocument(ctx context.Context, msg *types.MsgVerifyDocument) (*types.MsgVerifyDocumentResponse, error) {
	if _, err := k.addressCodec.StringToBytes(msg.Creator); err != nil {
		return nil, errorsmod.Wrap(err, "invalid authority address")
	}

	// TODO: Handle the message

	return &types.MsgVerifyDocumentResponse{}, nil
}
