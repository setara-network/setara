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

// Register is a PUBLIC endpoint — new orgs self-register here
func (h *OrgHandler) Register(w http.ResponseWriter, r *http.Request) {
	var req models.RegisterRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, `{"error":"invalid request body"}`, http.StatusBadRequest)
		return
	}

	if req.Name == "" || req.FirstName == "" || req.LastName == "" || req.Email == "" || req.Phone == "" {
		http.Error(w, `{"error":"name, first_name, last_name, email, and phone are required"}`, http.StatusBadRequest)
		return
	}

	org, err := h.db.RegisterOrg(&req)
	if err != nil {
		if err.Error() == "email already registered" {
			http.Error(w, `{"error":"email already registered"}`, http.StatusConflict)
			return
		}
		http.Error(w, `{"error":"registration failed"}`, http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]interface{}{
		"message": "Registration successful. Save your org_id and api_key — you will need them to interact with Setara Network.",
		"org_id":  org.ID,
		"api_key": org.APIKey,
		"credits": 5000,
		"note":    "You have been credited 5,000 free credits to build and test.",
	})
}

// --- Super Admin endpoints ---

func (h *OrgHandler) ListOrgs(w http.ResponseWriter, r *http.Request) {
	orgs, err := h.db.ListOrgs()
	if err != nil {
		http.Error(w, `{"error":"failed to list orgs"}`, http.StatusInternalServerError)
		return
	}
	if orgs == nil {
		json.NewEncoder(w).Encode([]struct{}{})
		return
	}
	json.NewEncoder(w).Encode(orgs)
}

func (h *OrgHandler) GetOrg(w http.ResponseWriter, r *http.Request) {
	orgID := r.PathValue("id")
	org, err := h.db.GetOrg(orgID)
	if err != nil {
		http.Error(w, `{"error":"organization not found"}`, http.StatusNotFound)
		return
	}
	json.NewEncoder(w).Encode(org)
}

func (h *OrgHandler) DeactivateOrg(w http.ResponseWriter, r *http.Request) {
	orgID := r.PathValue("id")
	if err := h.db.SetOrgActive(orgID, false); err != nil {
		http.Error(w, `{"error":"failed to deactivate"}`, http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(map[string]string{"status": "deactivated", "org_id": orgID})
}

func (h *OrgHandler) ActivateOrg(w http.ResponseWriter, r *http.Request) {
	orgID := r.PathValue("id")
	if err := h.db.SetOrgActive(orgID, true); err != nil {
		http.Error(w, `{"error":"failed to activate"}`, http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(map[string]string{"status": "activated", "org_id": orgID})
}
