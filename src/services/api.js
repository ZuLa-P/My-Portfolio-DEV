const API_BASE = import.meta.env.VITE_API_URL || "/api";

async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  if (options.body) ;

  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  const data = await res.json();

  if (!res.ok) {
    console.error(`[API] Error ${res.status}:`, data);
    throw new Error(data.message || data.error || "Something went wrong");
  }

  return data;
}

// Contact
export const contactAPI = {
  send: (formData) =>
    request("/contact", {
      method: "POST",
      body: JSON.stringify(formData),
    }),
};

// Projects
export const projectsAPI = {
  getAll: () => request("/project"),
  getById: (id) => request(`/project/${id}`),
};

// Home
export const homeAPI = {
  get: () => request("/home"),
};
