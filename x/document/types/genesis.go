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
	documentHashMap := make(map[string]struct{})

	for i, elem := range gs.DocumentMap {
		if elem.Index == "" {
			return fmt.Errorf("document at position %d has empty index", i)
		}
		if elem.Hash == "" {
			return fmt.Errorf("document at position %d has empty hash", i)
		}
		if elem.OrgId == "" {
			return fmt.Errorf("document at position %d has empty org_id", i)
		}
		if elem.Issuer == "" {
			return fmt.Errorf("document at position %d has empty issuer", i)
		}
		if len(elem.Metadata) > 4096 {
			return fmt.Errorf("document at position %d has metadata exceeding 4096 bytes", i)
		}

		index := fmt.Sprint(elem.Index)
		if _, ok := documentIndexMap[index]; ok {
			return fmt.Errorf("duplicated index for document: %s", index)
		}
		documentIndexMap[index] = struct{}{}

		if _, ok := documentHashMap[elem.Hash]; ok {
			return fmt.Errorf("duplicated hash for document: %s", elem.Hash)
		}
		documentHashMap[elem.Hash] = struct{}{}
	}

	return gs.Params.Validate()
}
