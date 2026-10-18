const TOKEN_KEY = "portfolio_cms_token";
const EXPIRES_KEY = "portfolio_cms_expires";

export function getToken() {
  const token = localStorage.getItem(TOKEN_KEY);
  const expires = localStorage.getItem(EXPIRES_KEY);
  if (!token || !expires) return null;
  if (new Date(expires).getTime() <= Date.now()) {
    clearAuth();
    return null;
  }
  return token;
}

export function setAuth(token, expiresAt) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(EXPIRES_KEY, expiresAt);
}

export function clearAuth() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(EXPIRES_KEY);
}

export function isAuthenticated() {
  return Boolean(getToken());
}
