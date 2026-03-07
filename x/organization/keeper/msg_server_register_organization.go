package keeper

import (
	"context"
	"crypto/sha256"
	"encoding/hex"

	"setara/x/organization/types"

	errorsmod "cosmossdk.io/errors"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k msgServer) RegisterOrganization(ctx context.Context, msg *types.MsgRegisterOrganization) (*types.MsgRegisterOrganizationResponse, error) {
	if _, err := k.addressCodec.StringToBytes(msg.Creator); err != nil {
		return nil, errorsmod.Wrap(err, "invalid authority address")
	}

	if msg.Name == "" {
		return nil, errorsmod.Wrap(types.ErrInvalidOrgName, "organization name cannot be empty")
	}

	// Generate deterministic org ID from creator + name
	hash := sha256.Sum256([]byte(msg.Creator + msg.Name))
	orgId := hex.EncodeToString(hash[:8])

	// Check if org already exists
	has, err := k.Organization.Has(ctx, orgId)
	if err != nil {
		return nil, err
	}
	if has {
		return nil, errorsmod.Wrap(types.ErrOrgAlreadyExists, orgId)
	}

	org := types.Organization{
		Index:        orgId,
		Name:         msg.Name,
		Description:  msg.Description,
		IpfsEndpoint: msg.IpfsEndpoint,
		Admin:        msg.Creator,
		IsActive:     true,
	}

	if err := k.Organization.Set(ctx, orgId, org); err != nil {
		return nil, err
	}

	sdkCtx := sdk.UnwrapSDKContext(ctx)
	sdkCtx.EventManager().EmitEvent(
		sdk.NewEvent(
			"register_organization",
			sdk.NewAttribute("org_id", orgId),
			sdk.NewAttribute("name", msg.Name),
			sdk.NewAttribute("admin", msg.Creator),
		),
	)

	return &types.MsgRegisterOrganizationResponse{}, nil
}
