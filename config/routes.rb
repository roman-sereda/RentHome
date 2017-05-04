Rails.application.routes.draw do

  root 'application#index'

  mount_devise_token_auth_for 'Host', at: 'host_auth'

  mount_devise_token_auth_for 'Guest', at: 'guest_auth'
  as :guest do
    # Define routes for Guest within this block.
  end

  resource :houses, only: [:show, :create, :update, :destroy]
  get "/houses/search", to: "houses#search"

end
