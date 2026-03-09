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
	organizationNameMap := make(map[string]struct{})

	for i, elem := range gs.OrganizationMap {
		if elem.Index == "" {
			return fmt.Errorf("organization at position %d has empty index", i)
		}
		if elem.Name == "" {
			return fmt.Errorf("organization at position %d has empty name", i)
		}
		if elem.Admin == "" {
			return fmt.Errorf("organization at position %d has empty admin address", i)
		}

		index := fmt.Sprint(elem.Index)
		if _, ok := organizationIndexMap[index]; ok {
			return fmt.Errorf("duplicated index for organization: %s", index)
		}
		organizationIndexMap[index] = struct{}{}

		if _, ok := organizationNameMap[elem.Name]; ok {
			return fmt.Errorf("duplicated name for organization: %s", elem.Name)
		}
		organizationNameMap[elem.Name] = struct{}{}
	}

	return gs.Params.Validate()
}
