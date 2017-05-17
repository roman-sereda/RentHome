Rails.application.routes.draw do

  root 'application#index'

  mount_devise_token_auth_for 'Host', at: 'host_auth'

  mount_devise_token_auth_for 'Guest', at: 'guest_auth'

  resources :guests, except: [:index, :new, :edit]

  resources :hosts

  scope :subscription do
    get "show", to: "subscription#show"
      get "create", to: "subscription#create"
  end

  resources :houses, except: [:index, :new, :edit] do
    resources :reviews, only: [:create, :index]
    get "search", on: :collection
  end
end
