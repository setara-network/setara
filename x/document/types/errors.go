package types

import (
	"cosmossdk.io/errors"
)

var (
	ErrInvalidSigner    = errors.Register(ModuleName, 1100, "expected gov account as only signer for proposal message")
	ErrDocAlreadyExists = errors.Register(ModuleName, 1101, "document with this hash already exists")
	ErrDocNotFound      = errors.Register(ModuleName, 1102, "document not found")
	ErrInvalidHash      = errors.Register(ModuleName, 1103, "invalid document hash")
	ErrInvalidIpfsCid   = errors.Register(ModuleName, 1104, "invalid IPFS CID")
	ErrInvalidOrgId     = errors.Register(ModuleName, 1105, "invalid organization ID")
)
