package types

import (
	"cosmossdk.io/errors"
)

var (
	ErrInvalidSigner    = errors.Register(ModuleName, 1100, "expected gov account as only signer for proposal message")
	ErrOrgAlreadyExists = errors.Register(ModuleName, 1101, "organization already exists")
	ErrOrgNotFound      = errors.Register(ModuleName, 1102, "organization not found")
	ErrUnauthorized     = errors.Register(ModuleName, 1103, "unauthorized")
	ErrInvalidOrgName   = errors.Register(ModuleName, 1104, "invalid organization name")
)
