package handlers

import (
	"encoding/json"
	"net/http"

	"setara/api/models"
	"setara/api/store"
)

type OrgHandler struct {
	db *store.Store
}

func NewOrgHandler(db *store.Store) *OrgHandler {
	return &OrgHandler{db: db}
}

func (h *OrgHandler) GetOrg(w http.ResponseWriter, r *http.Request) {
	orgID := r.PathValue("id")
	org, err := h.db.GetOrg(orgID)
	if err != nil {
		http.Error(w, "organization not found", http.StatusNotFound)
		return
	}
	json.NewEncoder(w).Encode(org)
}

func (h *OrgHandler) ListOrgs(w http.ResponseWriter, r *http.Request) {
	orgs, err := h.db.ListOrgs()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(orgs)
}

func (h *OrgHandler) CreateOrg(w http.ResponseWriter, r *http.Request) {
	var org models.Organization
	if err := json.NewDecoder(r.Body).Decode(&org); err != nil {
		http.Error(w, "invalid request body", http.StatusBadRequest)
		return
	}

	if org.Name == "" {
		http.Error(w, "name is required", http.StatusBadRequest)
		return
	}

	if err := h.db.CreateOrg(&org); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(org)
}
