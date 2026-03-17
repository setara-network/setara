package keeper

import (
	"context"
	"errors"

	"cosmossdk.io/collections"
)

func (k Keeper) GetOrganization(ctx context.Context, orgId string) (admin string, isActive bool, found bool, err error) {
	// Direct key lookup by ID
	org, err := k.Organization.Get(ctx, orgId)
	if err == nil {
		return org.Admin, org.IsActive, true, nil
	}
	if !errors.Is(err, collections.ErrNotFound) {
		return "", false, false, err
	}

	// Lookup by name via index instead of full-table scan
	resolvedId, err := k.NameIndex.Get(ctx, orgId)
	if err != nil {
		if errors.Is(err, collections.ErrNotFound) {
			return "", false, false, nil
		}
		return "", false, false, err
	}

	org, err = k.Organization.Get(ctx, resolvedId)
	if err != nil {
		if errors.Is(err, collections.ErrNotFound) {
			return "", false, false, nil
		}
		return "", false, false, err
	}

	return org.Admin, org.IsActive, true, nil
}
