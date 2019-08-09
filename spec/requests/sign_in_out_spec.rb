require 'rails_helper'

describe 'SignInOut', type: :request do
  include ActionController::RespondWith
  let(:user) { create(:user) }

  context 'should get success status when sign_in' do
    it 'get sign_in form' do
      get '/#/sign_in'
      expect(response).to have_http_status(:success)
    end

    it 'with right params' do
      post '/auth/sign_in', params: { email: user.email, password: user.password }
      expect(response).to have_http_status(:success)
    end
  end

  context 'get error status when sign_in' do
    it 'fill only password' do
      post '/auth/sign_in', params: { password: user.password }
      expect(response).to have_http_status(401)
    end

    it 'fill only email' do
      post '/auth/sign_in', params: { email: user.email }
      expect(response).to have_http_status(401)
    end

    it 'email and password are swapped' do
      post '/auth/sign_in', params: { email: user.password, password: user.email }
      expect(response).to have_http_status(401)
    end
  end

  context 'should get success status when sign_out' do
    it 'get main page' do
      get '/'
      expect(response).to have_http_status(:success)
    end

    it 'with right token' do
      delete '/auth/sign_out', params: user.create_new_auth_token
      expect(response).to have_http_status(:success)
    end
  end
  context 'should get error status when sign_out' do
    it 'without params' do
      delete '/auth/sign_out'
      expect(response).to have_http_status(404)
    end

    it 'incorrect params' do
      delete '/auth/sign_out', params: {}
      expect(response).to have_http_status(404)
    end
  end
end
