package keeper

import (
	"context"
	"crypto/sha256"
	"encoding/hex"

	"setara/x/document/types"

	errorsmod "cosmossdk.io/errors"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k msgServer) RegisterDocument(ctx context.Context, msg *types.MsgRegisterDocument) (*types.MsgRegisterDocumentResponse, error) {
	if _, err := k.addressCodec.StringToBytes(msg.Creator); err != nil {
		return nil, errorsmod.Wrap(err, "invalid authority address")
	}

	if msg.Hash == "" {
		return nil, errorsmod.Wrap(types.ErrInvalidHash, "document hash cannot be empty")
	}
	if msg.IpfsCid == "" {
		return nil, errorsmod.Wrap(types.ErrInvalidIpfsCid, "IPFS CID cannot be empty")
	}
	if msg.OrgId == "" {
		return nil, errorsmod.Wrap(types.ErrInvalidOrgId, "organization ID cannot be empty")
	}

	// Verify the sender is the admin of the specified organization
	admin, isActive, found, err := k.orgKeeper.GetOrganization(ctx, msg.OrgId)
	if err != nil {
		return nil, err
	}
	if !found {
		return nil, errorsmod.Wrap(types.ErrInvalidOrgId, "organization not found")
	}
	if !isActive {
		return nil, errorsmod.Wrap(types.ErrUnauthorized, "organization is not active")
	}
	if admin != msg.Creator {
		return nil, errorsmod.Wrap(types.ErrUnauthorized, "only the organization admin can register documents")
	}

	// Check if document with this hash already exists
	existingIdx, err := k.HashIndex.Get(ctx, msg.Hash)
	if err == nil && existingIdx != "" {
		return nil, errorsmod.Wrap(types.ErrDocAlreadyExists, msg.Hash)
	}

	// Generate deterministic document ID
	idHash := sha256.Sum256([]byte(msg.Hash + msg.OrgId))
	docId := hex.EncodeToString(idHash[:8])

	sdkCtx := sdk.UnwrapSDKContext(ctx)

	doc := types.Document{
		Index:     docId,
		Hash:      msg.Hash,
		IpfsCid:   msg.IpfsCid,
		OrgId:     msg.OrgId,
		DocType:   msg.DocType,
		Metadata:  msg.Metadata,
		Issuer:    msg.Creator,
		Recipient: msg.Recipient,
		IssuedAt:  sdkCtx.BlockTime().Unix(),
	}

	if err := k.Document.Set(ctx, docId, doc); err != nil {
		return nil, err
	}

	// Store hash -> docId index for fast lookups
	if err := k.HashIndex.Set(ctx, msg.Hash, docId); err != nil {
		return nil, err
	}

	sdkCtx.EventManager().EmitEvent(
		sdk.NewEvent(
			"register_document",
			sdk.NewAttribute("document_id", docId),
			sdk.NewAttribute("hash", msg.Hash),
			sdk.NewAttribute("org_id", msg.OrgId),
			sdk.NewAttribute("issuer", msg.Creator),
		),
	)

	return &types.MsgRegisterDocumentResponse{}, nil
}
