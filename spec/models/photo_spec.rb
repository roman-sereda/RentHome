require 'rails_helper'

RSpec.describe Photo, type: :model do

  it {
    photo = create :photo
    p photo.image_url
  }
end
