class Host < ActiveRecord::Base

  devise :database_authenticatable, :registerable,
          :recoverable, :rememberable, :trackable, :validatable,
          :confirmable, :omniauthable
  include DeviseTokenAuth::Concerns::User

  has_many :houses, dependent: :destroy
  has_one :subscription, dependent: :destroy

  # validates :name, presence: true
  # validates :surname, presence: true

  def subscribed?
    return true if subscription && subscription.end_time >= Date.today
  end
end
