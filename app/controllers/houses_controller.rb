class HousesController < BaseController
  before_action :authenticate_host!, except: [:show, :search]
  before_action :set_house, only: [:show, :update, :destroy]
  before_action :authenticate_associated_host, only: [:update, :destroy]
  rescue_from ActiveRecord::RecordNotFound, with: :invalid_house

  def search
    render json: { houses: House.where(filters).page(params[:page]) }
  end

  def show
    impressionist(@house)
    render json: { house: @house }
  end

  def create
    house = current_host.houses.new(house_params)
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
    params.require(:house).permit(:floor, :rent_start,
    :rent_end, :rooms, :city, :conditioner, :parking, :animals_allowed,
    :wi_fi, :heating, :price_per_day, :price_per_month, :type_of_building, :title, :address,
    :apartment_number, :total_area, :sleep_places)
  end

  def filters
    params.require(:filters).permit(:floor, :rent_start,
    :rent_end, :rooms, :city, :conditioner, :parking, :animals_allowed,
    :type_of_building, :wi_fi, :heating) if params[:filters]
  end

  def set_house
    @house = House.find(params[:id])
  end

  def invalid_house
    render json: { errors: { id: ["Wrong house ID provided"] }},
      status: 422
  end

  def authenticate_associated_host
    unless @house.host.id == current_host.id
      render json: { errors: { id: ["It`s not your house"] }},
        status: 401
    end
  end

end
