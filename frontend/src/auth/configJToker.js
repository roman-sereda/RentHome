import Auth from 'j-toker';

export const BASE_CONFIG = Auth.configure({
  apiUrl:                'http://localhost:3000',
  signOutPath:           '/host_auth/sign_out',
  emailSignInPath:       '/host_auth/sign_in',
  emailRegistrationPath: '/host_auth',
  accountUpdatePath:     '/host_auth',
  accountDeletePath:     '/host_auth',
  passwordResetPath:     '/host_auth/password',
  passwordUpdatePath:    '/host_auth/password',
  tokenValidationPath:   '/host_auth/validate_token',
  proxyIf:               function() { return false; },
  proxyUrl:              '/proxy',
  validateOnPageLoad:    false,
  forceHardRedirect:     false,
  storage:               'cookies',
  cookieExpiry:          14,
  cookiePath:            '/',

  passwordResetSuccessUrl: function() {
    return window.location.href;
  },

  confirmationSuccessUrl:  function() {
    return window.location.href;
  },

  tokenFormat: {
    "access-token": "{{ access-token }}",
    "token-type":   "Bearer",
    client:         "{{ client }}",
    expiry:         "{{ expiry }}",
    uid:            "{{ uid }}"
  },

  parseExpiry: function(headers){
    // convert from ruby time (seconds) to js time (millis)
    return (parseInt(headers['expiry'], 10) * 1000) || null;
  },

  handleLoginResponse: function(resp) {
    return resp.data;
  },

  handleAccountUpdateResponse: function(resp) {
    return resp.data;
  },

  handleTokenValidationResponse: function(resp) {
    return resp.data;
  },

  authProviderPaths: {
    facebook:  '/host_auth/facebook',
    google:    '/host_auth/google_oauth2'
  }
});
