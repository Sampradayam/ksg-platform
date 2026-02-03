const SESSION_DAYS = 2;
const SESSION_MS = SESSION_DAYS * 24 * 60 * 60 * 1000;

export const storeUserInfo = (data) => {
  const expiresAt = Date.now() + SESSION_MS;
  const payload = { ...data, expiresAt };
  try {
    localStorage.setItem("userInfo", JSON.stringify(payload));
  } catch {
    // ignore storage errors
  }
  return payload;
};

export const clearUserInfo = () => {
  try {
    localStorage.removeItem("userInfo");
  } catch {
    // ignore storage errors
  }
};

export const isUserInfoExpired = (info) =>
  !info?.expiresAt || Date.now() > info.expiresAt;

export const getUserInfo = () => {
  try {
    const stored = JSON.parse(localStorage.getItem("userInfo")) || null;
    if (!stored || isUserInfoExpired(stored)) {
      clearUserInfo();
      return null;
    }
    return stored;
  } catch {
    clearUserInfo();
    return null;
  }
};
