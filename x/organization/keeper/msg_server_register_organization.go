package keeper

import (
	"context"

	"setara/x/organization/types"

	errorsmod "cosmossdk.io/errors"
)

func (k msgServer) RegisterOrganization(ctx context.Context, msg *types.MsgRegisterOrganization) (*types.MsgRegisterOrganizationResponse, error) {
	if _, err := k.addressCodec.StringToBytes(msg.Creator); err != nil {
		return nil, errorsmod.Wrap(err, "invalid authority address")
	}

	// TODO: Handle the message

	return &types.MsgRegisterOrganizationResponse{}, nil
}
