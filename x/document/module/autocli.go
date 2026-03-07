package document

import (
	autocliv1 "cosmossdk.io/api/cosmos/autocli/v1"

	"setara/x/document/types"
)

// AutoCLIOptions implements the autocli.HasAutoCLIConfig interface.
func (am AppModule) AutoCLIOptions() *autocliv1.ModuleOptions {
	return &autocliv1.ModuleOptions{
		Query: &autocliv1.ServiceCommandDescriptor{
			Service: types.Query_serviceDesc.ServiceName,
			RpcCommandOptions: []*autocliv1.RpcCommandOptions{
				{
					RpcMethod: "Params",
					Use:       "params",
					Short:     "Shows the parameters of the module",
				},
				{
					RpcMethod: "ListDocument",
					Use:       "list-document",
					Short:     "List all document",
				},
				{
					RpcMethod:      "GetDocument",
					Use:            "get-document [id]",
					Short:          "Gets a document",
					Alias:          []string{"show-document"},
					PositionalArgs: []*autocliv1.PositionalArgDescriptor{{ProtoField: "index"}},
				},
				{
					RpcMethod:      "DocumentByHash",
					Use:            "document-by-hash [hash]",
					Short:          "Query document-by-hash",
					PositionalArgs: []*autocliv1.PositionalArgDescriptor{{ProtoField: "hash"}},
				},
			},
		},
		Tx: &autocliv1.ServiceCommandDescriptor{
			Service:              types.Msg_serviceDesc.ServiceName,
			EnhanceCustomCommand: true, // only required if you want to use the custom command
			RpcCommandOptions: []*autocliv1.RpcCommandOptions{
				{
					RpcMethod: "UpdateParams",
					Skip:      true, // skipped because authority gated
				},
				{
					RpcMethod:      "RegisterDocument",
					Use:            "register-document [hash] [ipfs-cid] [org-id] [doc-type] [metadata] [recipient]",
					Short:          "Send a register-document tx",
					PositionalArgs: []*autocliv1.PositionalArgDescriptor{{ProtoField: "hash"}, {ProtoField: "ipfs_cid"}, {ProtoField: "org_id"}, {ProtoField: "doc_type"}, {ProtoField: "metadata"}, {ProtoField: "recipient"}},
				},
				{
					RpcMethod:      "VerifyDocument",
					Use:            "verify-document [document-id]",
					Short:          "Send a verify-document tx",
					PositionalArgs: []*autocliv1.PositionalArgDescriptor{{ProtoField: "document_id"}},
				},
			},
		},
	}
}
