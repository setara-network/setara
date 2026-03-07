package document

import (
	"math/rand"

	"github.com/cosmos/cosmos-sdk/types/module"
	simtypes "github.com/cosmos/cosmos-sdk/types/simulation"
	"github.com/cosmos/cosmos-sdk/x/simulation"

	documentsimulation "setara/x/document/simulation"
	"setara/x/document/types"
)

// GenerateGenesisState creates a randomized GenState of the module.
func (AppModule) GenerateGenesisState(simState *module.SimulationState) {
	accs := make([]string, len(simState.Accounts))
	for i, acc := range simState.Accounts {
		accs[i] = acc.Address.String()
	}
	documentGenesis := types.GenesisState{
		Params: types.DefaultParams(),
	}
	simState.GenState[types.ModuleName] = simState.Cdc.MustMarshalJSON(&documentGenesis)
}

// RegisterStoreDecoder registers a decoder.
func (am AppModule) RegisterStoreDecoder(_ simtypes.StoreDecoderRegistry) {}

// WeightedOperations returns the all the gov module operations with their respective weights.
func (am AppModule) WeightedOperations(simState module.SimulationState) []simtypes.WeightedOperation {
	operations := make([]simtypes.WeightedOperation, 0)
	const (
		opWeightMsgRegisterDocument          = "op_weight_msg_document"
		defaultWeightMsgRegisterDocument int = 100
	)

	var weightMsgRegisterDocument int
	simState.AppParams.GetOrGenerate(opWeightMsgRegisterDocument, &weightMsgRegisterDocument, nil,
		func(_ *rand.Rand) {
			weightMsgRegisterDocument = defaultWeightMsgRegisterDocument
		},
	)
	operations = append(operations, simulation.NewWeightedOperation(
		weightMsgRegisterDocument,
		documentsimulation.SimulateMsgRegisterDocument(am.authKeeper, am.bankKeeper, am.keeper, simState.TxConfig),
	))
	const (
		opWeightMsgVerifyDocument          = "op_weight_msg_document"
		defaultWeightMsgVerifyDocument int = 100
	)

	var weightMsgVerifyDocument int
	simState.AppParams.GetOrGenerate(opWeightMsgVerifyDocument, &weightMsgVerifyDocument, nil,
		func(_ *rand.Rand) {
			weightMsgVerifyDocument = defaultWeightMsgVerifyDocument
		},
	)
	operations = append(operations, simulation.NewWeightedOperation(
		weightMsgVerifyDocument,
		documentsimulation.SimulateMsgVerifyDocument(am.authKeeper, am.bankKeeper, am.keeper, simState.TxConfig),
	))

	return operations
}

// ProposalMsgs returns msgs used for governance proposals for simulations.
func (am AppModule) ProposalMsgs(simState module.SimulationState) []simtypes.WeightedProposalMsg {
	return []simtypes.WeightedProposalMsg{}
}
