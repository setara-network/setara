package keeper

import (
	"context"
	"crypto/sha256"
	"encoding/hex"
	"regexp"

	"setara/x/document/types"

	errorsmod "cosmossdk.io/errors"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

// hashRegex validates document hash format: optional "sha256:" prefix + 64 hex chars
var hashRegex = regexp.MustCompile(`^(sha256:)?[0-9a-fA-F]{64}$`)

// ipfsCidRegex validates IPFS CID v0 (Qm...) and v1 (bafy...) formats
var ipfsCidRegex = regexp.MustCompile(`^(Qm[1-9A-HJ-NP-Za-km-z]{44,}|b[a-z2-7]{58,})$`)

func (k msgServer) RegisterDocument(ctx context.Context, msg *types.MsgRegisterDocument) (*types.MsgRegisterDocumentResponse, error) {
	if _, err := k.addressCodec.StringToBytes(msg.Creator); err != nil {
		return nil, errorsmod.Wrap(err, "invalid authority address")
	}

	if msg.Hash == "" {
		return nil, errorsmod.Wrap(types.ErrInvalidHash, "document hash cannot be empty")
	}
	if !hashRegex.MatchString(msg.Hash) {
		return nil, errorsmod.Wrap(types.ErrInvalidHash, "invalid hash format, expected sha256:<64 hex chars> or 64 hex chars")
	}
	if msg.IpfsCid == "" {
		return nil, errorsmod.Wrap(types.ErrInvalidIpfsCid, "IPFS CID cannot be empty")
	}
	if len(msg.IpfsCid) > 256 {
		return nil, errorsmod.Wrap(types.ErrInvalidIpfsCid, "IPFS CID too long")
	}
	if !ipfsCidRegex.MatchString(msg.IpfsCid) {
		return nil, errorsmod.Wrap(types.ErrInvalidIpfsCid, "invalid IPFS CID format, expected CIDv0 (Qm...) or CIDv1 (bafy...)")
	}
	if msg.OrgId == "" {
		return nil, errorsmod.Wrap(types.ErrInvalidOrgId, "organization ID cannot be empty")
	}
	// Enforce metadata size limit (max 4KB)
	if len(msg.Metadata) > 4096 {
		return nil, errorsmod.Wrap(types.ErrInvalidHash, "metadata too large (max 4096 bytes)")
	}
	// Enforce recipient size limit
	if len(msg.Recipient) > 256 {
		return nil, errorsmod.Wrap(types.ErrInvalidHash, "recipient too long (max 256 chars)")
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

	// Generate deterministic document ID using full SHA256 to avoid collision risk
	idHash := sha256.Sum256([]byte(msg.Hash + msg.OrgId))
	docId := hex.EncodeToString(idHash[:])

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
