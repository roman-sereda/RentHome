import Auth from 'j-toker';

import { CONFIG } from "./configJToker"


function createUserThroughEmail(createdUser, role) {
  return Auth.emailSignUp({ email: createdUser.email,
                            password: createdUser.password,
                            password_confirmation: createdUser.password,
                            config: choiseConfig(role) })
}

function createUserThroughFacebook(role) {
  Auth.oAuthSignIn({
    provider: 'facebook',
    config: choiseConfig(role),
  })
}

function createUserThroughGoogle(role) {
  Auth.oAuthSignIn({
    provider: 'google',
    config: choiseConfig(role),
  })
}

function choiseConfig(role){
  if (role == 'rent') {
    return ('host_user')
  }
  else {
    return ('guest_user')
  }
}

export function authUser({way, dataUser, role}){

  if (role == null){
    return
  }

  switch(way) {
    case 'emailRegistration':
      createUserThroughEmail(dataUser, role)
      break

    case 'emailLogin':
      loginUserThroughEmail(dataUser, role)
      break

    case 'facebook':
      createUserThroughFacebook(role)
      break

    case 'google':
      createUserThroughGoogle(role)
      break
  }
}
