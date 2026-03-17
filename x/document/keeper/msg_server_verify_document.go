package keeper

import (
	"context"
	"fmt"

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

	doc, err := k.Document.Get(ctx, msg.DocumentId)
	if err != nil {
		return nil, errorsmod.Wrap(types.ErrDocNotFound, msg.DocumentId)
	}

	// Only the org admin who issued the document can verify it
	admin, isActive, found, orgErr := k.orgKeeper.GetOrganization(ctx, doc.OrgId)
	if orgErr != nil {
		return nil, errorsmod.Wrap(types.ErrUnauthorized, "failed to look up organization")
	}
	if !found {
		return nil, errorsmod.Wrap(types.ErrUnauthorized, "document's organization not found")
	}
	if !isActive {
		return nil, errorsmod.Wrap(types.ErrUnauthorized, "document's organization is not active")
	}
	if admin != msg.Creator {
		return nil, errorsmod.Wrap(types.ErrUnauthorized, "only the organization admin can verify documents")
	}

	// Check if already verified
	_, err = k.Verified.Get(ctx, msg.DocumentId)
	if err == nil {
		return nil, errorsmod.Wrap(types.ErrDocAlreadyExists, "document already verified")
	}

	sdkCtx := sdk.UnwrapSDKContext(ctx)

	// Store verification record: "verifier|timestamp"
	verificationRecord := fmt.Sprintf("%s|%d", msg.Creator, sdkCtx.BlockTime().Unix())
	if err := k.Verified.Set(ctx, msg.DocumentId, verificationRecord); err != nil {
		return nil, err
	}

	sdkCtx.EventManager().EmitEvent(
		sdk.NewEvent(
			"verify_document",
			sdk.NewAttribute("document_id", msg.DocumentId),
			sdk.NewAttribute("verifier", msg.Creator),
		),
	)

	return &types.MsgVerifyDocumentResponse{}, nil
}
