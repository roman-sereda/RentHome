import Auth from 'j-toker';

export const CONFIG = Auth.configure([
  {
    host_user: {
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
    }
  }, {
    guest_user: {
      apiUrl:                'http://localhost:3000',
      signOutPath:           '/guest_auth/sign_out',
      emailSignInPath:       '/guest_auth/sign_in',
      emailRegistrationPath: '/guest_auth',
      accountUpdatePath:     '/guest_auth',
      accountDeletePath:     '/guest_auth',
      passwordResetPath:     '/guest_auth/password',
      passwordUpdatePath:    '/guest_auth/password',
      tokenValidationPath:   '/guest_auth/validate_token',
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
        facebook:  '/guest_auth/facebook',
        google:    '/guest_auth/google_oauth2'
      }
    }
  }
]);
