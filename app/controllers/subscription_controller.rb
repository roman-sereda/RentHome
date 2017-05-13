class SubscriptionController < BaseController
  before_action :authenticate_host!

  def create
    sub = current_host.build_subscription(subscription_params)
    if sub.save
      render json: { subscription: sub }, status: :created
    else
      render json: { errors: sub.errors }, status: :unprocessable_entity
    end
  end

  def show
    render json: { subscription: current_host.subscription }
  end

  private

    def subscription_params
     params.require(:subscription).permit(:card_token, :email).merge({
       end_time: Date.today })
    end
end
