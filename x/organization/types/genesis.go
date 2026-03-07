package types

import "fmt"

// DefaultGenesis returns the default genesis state
func DefaultGenesis() *GenesisState {
	return &GenesisState{
		Params:          DefaultParams(),
		OrganizationMap: []Organization{}}
}

// Validate performs basic genesis state validation returning an error upon any
// failure.
func (gs GenesisState) Validate() error {
	organizationIndexMap := make(map[string]struct{})

	for _, elem := range gs.OrganizationMap {
		index := fmt.Sprint(elem.Index)
		if _, ok := organizationIndexMap[index]; ok {
			return fmt.Errorf("duplicated index for organization")
		}
		organizationIndexMap[index] = struct{}{}
	}

	return gs.Params.Validate()
}
