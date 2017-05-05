class GuestsController < BaseController
  before_action :set_guest, only: [:show, :update, :destroy]
  rescue_from ActiveRecord::RecordNotFound, with: :invalid_guest

  def show
    render json: { guest: @guest }
  end

  def create
    guest = Guest.new(guest_params)
    if guest.save
      render json: { guest: guest }, status: 201
    else
      render json: { errors: guest.errors }, status: 422
    end
  end

  def update
    if @guest.update_attributes(guest_params)
      render json: { guest: @guest }, status: 200
    else
      render json: { errors: @guest.errors }, status: 422
    end
  end

  def destroy
    @guest.destroy
    head 204
  end

  private

  def guest_params
    params.require(:guest).permit(:name, :surname, :email, :password,
                                  :password_confirmation, :uid, :nickname, :image,
                                  :nickname, :city, :country)
  end

  def set_guest
    @guest = Guest.find(params[:id])
  end

  def invalid_guest
    render json: { errors: { id: ["Wrong guest ID provided"] }}, status: 422
  end

end
