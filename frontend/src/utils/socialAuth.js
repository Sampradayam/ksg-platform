const loadScript = (src, id) =>
  new Promise((resolve, reject) => {
    if (id && document.getElementById(id)) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.defer = true;
    if (id) script.id = id;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.body.appendChild(script);
  });

export const ensureGoogleScript = async (clientId) => {
  if (!clientId) {
    throw new Error("Google Client ID is not configured");
  }
  await loadScript("https://accounts.google.com/gsi/client", "google-gsi");
  if (!window.google?.accounts?.oauth2) {
    throw new Error("Google Identity Services not available");
  }
};

export const requestGoogleAccessToken = (clientId) =>
  new Promise((resolve, reject) => {
    const tokenClient = window.google.accounts.oauth2.initTokenClient({
      client_id: clientId,
      scope: "openid email profile",
      callback: (response) => {
        if (response?.access_token) {
          resolve(response.access_token);
        } else {
          reject(new Error("Google sign-in was cancelled"));
        }
      },
      error_callback: () => reject(new Error("Google sign-in failed")),
    });

    tokenClient.requestAccessToken({ prompt: "consent" });
  });

export const ensureFacebookSdk = async (appId) => {
  if (!appId) {
    throw new Error("Facebook App ID is not configured");
  }

  if (window.FB) {
    window.FB.init({
      appId,
      cookie: true,
      xfbml: false,
      version: "v19.0",
    });
    return;
  }

  await loadScript("https://connect.facebook.net/en_US/sdk.js", "facebook-sdk");

  await new Promise((resolve) => {
    window.fbAsyncInit = () => {
      window.FB.init({
        appId,
        cookie: true,
        xfbml: false,
        version: "v19.0",
      });
      resolve();
    };
  });
};

export const requestFacebookAccessToken = () =>
  new Promise((resolve, reject) => {
    if (!window.FB) {
      reject(new Error("Facebook SDK not available"));
      return;
    }

    window.FB.login(
      (response) => {
        if (response?.authResponse?.accessToken) {
          resolve(response.authResponse.accessToken);
        } else {
          reject(new Error("Facebook sign-in was cancelled"));
        }
      },
      { scope: "email,public_profile" },
    );
  });
