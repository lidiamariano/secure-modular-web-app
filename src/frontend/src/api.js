const API_URL = import.meta.env.VITE_API_URL || "http://localhost";

export async function apiRequest(path, method = "GET", body = null, auth = false) {
  const headers = {
    "Content-Type": "application/json",
  };

  if (auth) {
    const token = localStorage.getItem("token");
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  });

  if (res.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

  const data = await res.json();
  return { status: res.status, data };
}
