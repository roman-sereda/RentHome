class ReviewsController < BaseController
  before_action :authenticate_guest!, only: [:create]
  before_action :set_house

  def index
    render json: { reviews: @house.reviews.page(params[:page]) }
  end

  def create
    review = @house.reviews.new(review_params)
    if review.save
      render json: { review: review }, status: :created
    else
      render json: { errors: review.errors }, status: :unprocessable_entity
    end
  end

  private

  def set_house
    @house = House.find(params[:house_id])
  end

    def review_params
      params.require(:review).permit(:text, :rating).merge({
        guest_id: current_guest.id })
    end
end
