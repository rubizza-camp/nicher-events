require 'rails_helper'

describe 'Edit profile', type: :request do
  let(:user) { create(:user) }
  let(:user_attributes) {
    {
      first_name: Faker::Name.first_name, last_name: Faker::Name.last_name, phone: Faker::PhoneNumber.phone_number,
      photo: fixture_file_upload('test_avatar.jpg', 'image/png')
    }
  }

  it 'get user profile form' do
    get '/user_profile'
    expect(response).to have_http_status(:success)
  end

  context 'when right params' do
    before do
      @header = user.create_new_auth_token
    end

    it 'update user params' do
      patch '/auth', params: user_attributes, headers: @header
      expect(json_response['data']['first_name']).to eq(user_attributes[:first_name])
      expect(json_response['data']['last_name']).to eq(user_attributes[:last_name])
      expect(json_response['data']['phone']).to eq(user_attributes[:phone])
      expect(json_response['data']['link_photo']).not_to eq('')
    end
  end

  context 'when invalid params' do
    it 'get error status' do
      patch '/auth', params: '', headers: @header
      expect(response).to have_http_status(422)
    end
  end
end
