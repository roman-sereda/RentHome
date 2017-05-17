FactoryGirl.define do
  factory :photo do
    feachered false
    image { Rack::Test::UploadedFile.new(File.join(Rails.root, 'spec', 'support','test.jpg'), 'image/jpg') }
  end
end
