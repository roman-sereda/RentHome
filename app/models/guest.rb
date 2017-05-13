class Guest < ActiveRecord::Base
  has_many :orders

  validates :name, presence: true
  validates :surname, presence: true

  devise :database_authenticatable, :registerable,
          :recoverable, :rememberable, :trackable, :validatable,
          :confirmable, :omniauthable
  include DeviseTokenAuth::Concerns::User
end
