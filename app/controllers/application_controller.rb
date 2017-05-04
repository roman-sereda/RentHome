class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  include DeviseTokenAuth::Concerns::SetUserByToken

  def index
    render 'layouts/application'
  end

end

