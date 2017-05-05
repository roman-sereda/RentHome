class HostsController < BaseController
  before_action :set_host, only: [:show, :update, :destroy]
  rescue_from ActiveRecord::RecordNotFound, with: :invalid_host

  def show
    render json: { host: @host }
  end

  def create
    host = Host.new(host_params)
    if host.save
      render json: { host: host }, status: 201
    else
      render json: { errors: host.errors }, status: 422
    end
  end

  def update
    if @host.update_attributes(host_params)
      render json: { host: @host }, status: 200
    else
      render json: { errors: @host.errors }, status: 422
    end
  end

  def destroy
    @host.destroy
    head 204
  end

  private

  def host_params
    params.require(:host).permit(:name, :surname, :email, :password,
                                  :password_confirmation, :uid, :nickname, :image,
                                  :nickname, :city, :country)
  end

  def set_host
    @host = Host.find(params[:id])
  end

  def invalid_host
    render json: { errors: { id: ["Wrong host ID provided"] }}, status: 422
  end

end
