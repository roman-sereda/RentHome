Rails.application.routes.draw do

  root 'application#index'

  mount_devise_token_auth_for 'Host', at: 'host_auth'

  mount_devise_token_auth_for 'Guest', at: 'guest_auth'
  
  resources :houses, only: [:show, :create, :update, :destroy]
  get "/houses/search", to: "houses#search"

end
