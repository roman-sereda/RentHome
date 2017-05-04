class HousesController < BaseController
  before_action :set_house, only: [:show, :update, :destroy]
  rescue_from ActiveRecord::RecordNotFound, with: :invalid_house

  def search
    render json: { houses: House.where(filters).page(params[:page]) }
  end

  def show
    render json: { house: @house }
  end

  def create
    house  = House.new(house_params)
    if house.save
      render json: { house: house }, status: 201
    else
      render json: { errors: house.errors }, status: 422
    end
  end

  def update
    if @house.update_attributes(house_params)
      render json: { house: @house }, status: 200
    else
      render json: { errors: @house.errors }, status: 422
    end
  end

  def destroy
    @house.destroy
    head 204
  end

  private

  def house_params
    params.require(:house).permit(:floor, :rent_start, :rent_end, :rooms, :city,
      :conditioner, :parking, :animals_allowed, :wi_fi, :heating)
  end

  def filters
    params.require(:filters).permit(:floor, :rent_start, :rent_end, :rooms, :city,
      :conditioner, :parking, :animals_allowed, :wi_fi, :heating) if params[:filters]
  end

  def set_house
    @house = House.find(params[:id])
  end

  def invalid_house
    render json: { errors: { id: ["Wrong house ID provided"] }}, status: 422
  end

end
