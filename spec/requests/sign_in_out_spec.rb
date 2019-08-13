require 'rails_helper'

describe 'SignInOut', type: :request do
  include ActionController::RespondWith
  let(:user) { create(:user) }

  context 'right params when sign_in' do
    it 'get sign_in form' do
      get '/#/sign_in'
      expect(response).to have_http_status(:success)
    end

    it 'return success' do
      post '/auth/sign_in', params: { email: user.email, password: user.password }
      expect(response).to have_http_status(:success)
    end
  end

  context 'when blank one of fields' do
    it 'return invalid login error' do
      post '/auth/sign_in', params: { password: user.password }
      expect(JSON.parse(response.body)['errors'].to_s).to include('Invalid login credentials')
    end

    it 'fill only email' do
      post '/auth/sign_in', params: { email: user.email }
      expect(JSON.parse(response.body)['errors'].to_s).to include('Invalid login credentials')
    end
  end

  context 'when enter incorrect data' do
    it 'email and password are swapped' do
      post '/auth/sign_in', params: { email: user.password, password: user.email }
      expect(JSON.parse(response.body)['errors'].to_s).to include('Invalid login credentials')
    end
  end

  context 'return success status' do
    it 'get main page' do
      get '/'
      expect(response).to have_http_status(:success)
    end

    it 'when right params' do
      delete '/auth/sign_out', params: user.create_new_auth_token
      expect(response).to have_http_status(:success)
    end
  end

  context 'when sign_out without params' do
    it 'return error code 404' do
      delete '/auth/sign_out'
      expect(response).to have_http_status(404)
    end
  end

  context 'when incorrect params ' do
    it 'return error code 404' do
      delete '/auth/sign_out', params: {}
      expect(response).to have_http_status(404)
    end
  end
end
