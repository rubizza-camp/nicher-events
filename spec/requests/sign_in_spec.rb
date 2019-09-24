require 'rails_helper'

describe 'SignIn', type: :request do
  include ActionController::RespondWith
  let(:user) { create(:user) }

  it 'get sign_in form' do
    get '/sign_in'
    expect(response).to have_http_status(:success)
  end

  context 'right params when sign_in' do
    it 'return success' do
      post '/auth/sign_in', params: { email: user.email, password: user.password }
      expect(response).to have_http_status(:success)
    end
  end

  context 'when enter incorrect data' do
    it 'return error message' do
      post '/auth/sign_in', params: { email: user.password, password: user.email }
      expect(json_response['errors'].to_s).to include('Invalid login credentials')
    end
  end
end
