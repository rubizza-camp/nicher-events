require 'rails_helper'

describe 'Edit profile', type: :request do
  let(:user) { create(:user) }
  let(:user_attributes) {
    [
      first_name: 'dima', last_name: 'kosikov', phone: '123456789',
      photo: fixture_file_upload('test_avatar.jpg', 'image/png')
    ]
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
      patch '/auth', params: user_attributes[0], headers: @header
      expect(json_response['data']['first_name']).to eq(user_attributes[0][:first_name])
      expect(json_response['data']['last_name']).to eq(user_attributes[0][:last_name])
      expect(json_response['data']['phone']).to eq(user_attributes[0][:phone])
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
