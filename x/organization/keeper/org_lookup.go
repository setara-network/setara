package keeper

import (
	"context"
	"errors"
	"fmt"

	"cosmossdk.io/collections"
)

func (k Keeper) GetOrganization(ctx context.Context, orgId string) (admin string, isActive bool, found bool, err error) {
	org, err := k.Organization.Get(ctx, orgId)
	if err == nil {
		return org.Admin, org.IsActive, true, nil
	}
	if !errors.Is(err, collections.ErrNotFound) {
		return "", false, false, err
	}

	iter, err := k.Organization.Iterate(ctx, nil)
	if err != nil {
		return "", false, false, err
	}
	defer iter.Close()

	for ; iter.Valid(); iter.Next() {
		o, err := iter.Value()
		if err != nil {
			return "", false, false, fmt.Errorf("failed to read organization during scan: %w", err)
		}
		if o.Name == orgId {
			return o.Admin, o.IsActive, true, nil
		}
	}

	return "", false, false, nil
}
