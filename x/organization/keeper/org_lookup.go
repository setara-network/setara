package keeper

import (
	"context"

	"cosmossdk.io/collections"
)

// GetOrganization returns the admin, active status, and whether the org was found.
// This method is used by other modules (e.g. document) for access control.
func (k Keeper) GetOrganization(ctx context.Context, orgId string) (admin string, isActive bool, found bool, err error) {
	org, err := k.Organization.Get(ctx, orgId)
	if err != nil {
		if err == collections.ErrNotFound {
			return "", false, false, nil
		}
		return "", false, false, err
	}
	return org.Admin, org.IsActive, true, nil
}
