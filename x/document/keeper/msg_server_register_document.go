package keeper

import (
	"context"

	"setara/x/document/types"

	errorsmod "cosmossdk.io/errors"
)

func (k msgServer) RegisterDocument(ctx context.Context, msg *types.MsgRegisterDocument) (*types.MsgRegisterDocumentResponse, error) {
	if _, err := k.addressCodec.StringToBytes(msg.Creator); err != nil {
		return nil, errorsmod.Wrap(err, "invalid authority address")
	}

	// TODO: Handle the message

	return &types.MsgRegisterDocumentResponse{}, nil
}
