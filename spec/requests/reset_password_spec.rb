require 'rails_helper'
Dotenv.load

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

  context 'right params when send letter' do
    it 'return deliveries.size = 1' do
      post '/auth/password', params: { email: user.email, redirect_url: ENV['PRODUCTION_HOST'] + '/reset_password' }
      expect(ActionMailer::Base.deliveries.size).to eq(1)
    end
  end

  context 'incorrect data when send letter' do
    it 'return error message' do
      post '/auth/password', params: { email: user.email }
      expect(ActionMailer::Base.deliveries.size).to eq(0)
    end
  end

  context 'right params when get /auth/password/edit' do
    it 'return found message' do
      get '/auth/password/edit', params: { reset_password_token: user.send(:set_reset_password_token),
                                           redirect_url: ENV['PRODUCTION_HOST'] + '/reset_password' }
      expect(response).to have_http_status(:found)
    end
  end

  context 'incorrect data when get /auth/password/edit' do
    it 'return error message' do
      get '/auth/password/edit', params: { reset_password_token: user.send(:set_reset_password_token) }
      expect(json_response['errors'].to_s).to include('Missing redirect URL')
    end
  end

  context 'right params when reset password' do
    it 'return success message' do
      get '/auth/password/edit', params: { reset_password_token: user.send(:set_reset_password_token),
                                           redirect_url: ENV['PRODUCTION_HOST'] + '/reset_password' }
      access_token = response.headers['location'].match(/access-token=(.+)&client=/)[1]
      client = response.headers['location'].match(/client=(.+)&client_id=/)[1]
      put '/auth/password', params: { password: user.password, password_confirmation: user.password,
                                      'access-token': access_token,
                                      client: client,
                                      uid: user.email }
      expect(response).to have_http_status(:success)
    end
  end

  context 'incorrect data when reset password' do
    it 'return error message' do
      put '/auth/password', params: { password: user.password, password_confirmation: user.password }
      expect(json_response['errors'].to_s).to include('Unauthorized')
    end
  end
end
