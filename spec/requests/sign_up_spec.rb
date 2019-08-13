require 'rails_helper'

describe 'SignUp', type: :request do
  let!(:user) { build(:user) }

  it 'return sign_up page' do
    get '/#/sign_up'
    expect(response).to have_http_status(:success)
  end

  context 'right params' do
    it 'return success status' do
      post '/auth', params: { first_name: user.first_name, last_name: user.last_name, email: user.email,
                              phone: user.phone, password: user.password, password_confirmation: user.password }
      expect(response).to have_http_status(:success)
    end
  end

  context 'when incorrect params' do
    it 'return error that email incorrect' do
      post '/auth', params: { first_name: user.first_name, last_name: user.last_name, email: user.password,
                              phone: user.phone, password: user.email }
      expect(json_response['errors']['full_messages']).to include('Email is not an email')
    end

    it 'return error message that phone too short' do
      post '/auth', params: { first_name: user.first_name, last_name: user.last_name, email: user.email,
                              phone: '1234', password: user.password }
      expect(json_response['errors']['full_messages'].to_s).to include('Phone is too short')
    end
  end
end
