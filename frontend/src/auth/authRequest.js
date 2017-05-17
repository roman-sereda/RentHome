import Auth from 'j-toker';

import { BASE_CONFIG } from "./configJToker"

export function createUser(createdUser) {
  return Auth.emailSignUp({ email: createdUser.email,
                            password: createdUser.password,
                            password_confirmation: createdUser.password })
}

export function createUserWithFacebook() {
  Auth.oAuthSignIn({
    provider: 'facebook',
    params: {
     resource_class: 'host_user'
    }
  })
}

export function createUserWithGoogle() {
  Auth.oAuthSignIn({
    provider: 'google',
    params: {
     resource_class: 'host_user'
    }
  })
}
