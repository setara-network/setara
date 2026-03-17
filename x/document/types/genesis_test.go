package types_test

import (
	"testing"

	"setara/x/document/types"

	"github.com/stretchr/testify/require"
)

func TestGenesisState_Validate(t *testing.T) {
	tests := []struct {
		desc     string
		genState *types.GenesisState
		valid    bool
	}{
		{
			desc:     "default is valid",
			genState: types.DefaultGenesis(),
			valid:    true,
		},
		{
			desc: "valid genesis state",
			genState: &types.GenesisState{DocumentMap: []types.Document{
				{Index: "0", Hash: "abc123", OrgId: "org1", Issuer: "setara1abc"},
				{Index: "1", Hash: "def456", OrgId: "org1", Issuer: "setara1abc"},
			}},
			valid: true,
		}, {
			desc: "duplicated document",
			genState: &types.GenesisState{
				DocumentMap: []types.Document{
					{
						Index: "0",
					},
					{
						Index: "0",
					},
				},
			},
			valid: false,
		},
	}
	for _, tc := range tests {
		t.Run(tc.desc, func(t *testing.T) {
			err := tc.genState.Validate()
			if tc.valid {
				require.NoError(t, err)
			} else {
				require.Error(t, err)
			}
		})
	}
}
