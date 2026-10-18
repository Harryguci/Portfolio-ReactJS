const API_BASE = import.meta.env.VITE_API_BASE ?? "";

function buildUrl(path, params) {
  const url = new URL(`${API_BASE}${path}`, window.location.origin);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        url.searchParams.set(key, String(value));
      }
    });
  }
  return `${url.pathname}${url.search}`;
}

async function request(path, { method = "GET", body, token, params } = {}) {
  const headers = {};
  if (body !== undefined) {
    headers["Content-Type"] = "application/json";
  }
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(buildUrl(path, params), {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (response.status === 204) {
    return null;
  }

  const text = await response.text();
  let data = null;
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }
  }

  if (!response.ok) {
    const message =
      (data && data.message) ||
      (typeof data === "string" && data) ||
      `Request failed (${response.status})`;
    const error = new Error(message);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

export const api = {
  health: () => request("/api/health"),
  login: (username, password) =>
    request("/api/auth/login", {
      method: "POST",
      body: { username, password },
    }),
  listBlogs: (params) => request("/api/blogs", { params }),
  getBlog: (slug) => request(`/api/blogs/${encodeURIComponent(slug)}`),
  cmsListBlogs: (token, params) =>
    request("/api/cms/blogs", { token, params }),
  cmsGetBlog: (token, id) =>
    request(`/api/cms/blogs/${id}`, { token }),
  cmsCreateBlog: (token, body) =>
    request("/api/cms/blogs", { method: "POST", token, body }),
  cmsUpdateBlog: (token, id, body) =>
    request(`/api/cms/blogs/${id}`, { method: "PUT", token, body }),
  cmsDeleteBlog: (token, id) =>
    request(`/api/cms/blogs/${id}`, { method: "DELETE", token }),
};
