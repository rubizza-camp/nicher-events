require 'rails_helper'

describe 'ResetPassword', type: :request do
  let(:user) { create(:user) }

  it 'get forgot password form' do
    get '/forgot_password'
    expect(response).to have_http_status(:success)
  end

  it 'get reset password form' do
    get '/reset_password'
    expect(response).to have_http_status(:success)
  end

  context 'right params when forgot password' do
    it 'return success' do
      post '/auth/password', params: { email: user.email, redirect_url: 'http://localhost:3000/reset_password' }
      expect(response).to have_http_status(:success)
    end
  end

  context 'incorrect data when forgot password' do
    it 'return error message' do
      post '/auth/password', params: { email: user.email }
      expect(json_response['errors'].to_s).to include('Missing redirect URL')
    end
  end

  context 'incorrect data when reset password' do
    it 'return error message' do
      put '/auth/password', params: { password: user.password, password_confirmation: user.password,
                                      'access-token': user.create_new_auth_token['access-token'],
                                      client: user.create_new_auth_token['client'],
                                      uid: user.create_new_auth_token['uid'] }
      expect(json_response['errors'].to_s).to include('Unauthorized')
    end
  end
end
