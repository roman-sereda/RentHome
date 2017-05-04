Rails.application.routes.draw do
  mount_devise_token_auth_for 'Host', at: 'host_auth'

  mount_devise_token_auth_for 'Guest', at: 'guest_auth'
  as :guest do
    # Define routes for Guest within this block.
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end