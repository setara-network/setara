package keeper

import (
	"context"

	"setara/x/organization/types"
)

// InitGenesis initializes the module's state from a provided genesis state.
func (k Keeper) InitGenesis(ctx context.Context, genState types.GenesisState) error {
	for _, elem := range genState.OrganizationMap {
		if err := k.Organization.Set(ctx, elem.Index, elem); err != nil {
			return err
		}
		// Populate name -> orgId index so orgs are findable by name
		if elem.Name != "" {
			if err := k.NameIndex.Set(ctx, elem.Name, elem.Index); err != nil {
				return err
			}
		}
	}

	return k.Params.Set(ctx, genState.Params)
}

// ExportGenesis returns the module's exported genesis.
func (k Keeper) ExportGenesis(ctx context.Context) (*types.GenesisState, error) {
	var err error

	genesis := types.DefaultGenesis()
	genesis.Params, err = k.Params.Get(ctx)
	if err != nil {
		return nil, err
	}
	if err := k.Organization.Walk(ctx, nil, func(_ string, val types.Organization) (stop bool, err error) {
		genesis.OrganizationMap = append(genesis.OrganizationMap, val)
		return false, nil
	}); err != nil {
		return nil, err
	}

	return genesis, nil
}
