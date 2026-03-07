package types

import "fmt"

// DefaultGenesis returns the default genesis state
func DefaultGenesis() *GenesisState {
	return &GenesisState{
		Params:      DefaultParams(),
		DocumentMap: []Document{}}
}

// Validate performs basic genesis state validation returning an error upon any
// failure.
func (gs GenesisState) Validate() error {
	documentIndexMap := make(map[string]struct{})

	for _, elem := range gs.DocumentMap {
		index := fmt.Sprint(elem.Index)
		if _, ok := documentIndexMap[index]; ok {
			return fmt.Errorf("duplicated index for document")
		}
		documentIndexMap[index] = struct{}{}
	}

	return gs.Params.Validate()
}
