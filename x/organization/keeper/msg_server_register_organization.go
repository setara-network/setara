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
	if len(msg.Name) > 256 {
		return nil, errorsmod.Wrap(types.ErrInvalidOrgName, "organization name too long (max 256 chars)")
	}
	if len(msg.Description) > 1024 {
		return nil, errorsmod.Wrap(types.ErrInvalidOrgName, "description too long (max 1024 chars)")
	}
	if len(msg.IpfsEndpoint) > 512 {
		return nil, errorsmod.Wrap(types.ErrInvalidOrgName, "IPFS endpoint too long (max 512 chars)")
	}

	// Generate deterministic org ID using full SHA256 to avoid collision risk
	hash := sha256.Sum256([]byte(msg.Creator + msg.Name))
	orgId := hex.EncodeToString(hash[:])

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

	// Store name -> orgId index for lookup without full-table scan
	if err := k.NameIndex.Set(ctx, msg.Name, orgId); err != nil {
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
