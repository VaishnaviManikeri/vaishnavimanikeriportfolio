// frontend/src/api.js

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://portfolio-u5ft.onrender.com/api";

// Helper function to get auth token
const getToken = () => localStorage.getItem("adminToken");

// API calls
export const api = {
  // ===============================
  // Projects
  // ===============================

  async getProjects() {
    const response = await fetch(`${API_URL}/projects`);

    if (!response.ok) {
      throw new Error("Failed to fetch projects");
    }

    return response.json();
  },

  async getProjectById(id) {
    const response = await fetch(`${API_URL}/projects/${id}`);

    if (!response.ok) {
      throw new Error("Failed to fetch project");
    }

    return response.json();
  },

  async createProject(formData) {
    const response = await fetch(`${API_URL}/projects`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to create project");
    }

    return response.json();
  },

  async updateProject(id, formData) {
    const response = await fetch(`${API_URL}/projects/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to update project");
    }

    return response.json();
  },

  async deleteProject(id) {
    const response = await fetch(`${API_URL}/projects/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete project");
    }

    return response.json();
  },

  // ===============================
  // Admin Login
  // ===============================

  async adminLogin(email, password) {
    const response = await fetch(`${API_URL}/admin/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Login failed");
    }

    return response.json();
  },
};