require 'rails_helper'

describe 'SignInOut', type: :request do
  include ActionController::RespondWith
  before(:each) do
    @user = create(:user)
  end

  it 'should get success status after sign_in' do
    get '/#/sign_in'
    expect(response).to have_http_status(:success)

    post '/auth/sign_in', params: { email: @user.email, password: @user.password }
    expect(response).to have_http_status(:success)
  end

  it 'should get error status after sign_in' do
    post '/auth/sign_in', params: { email: '', password: @user.password }
    expect(response).to have_http_status(401)

    post '/auth/sign_in', params: { email: @user.email, password: '' }
    expect(response).to have_http_status(401)

    post '/auth/sign_in', params: { email: @user.password, password: @user.email }
    expect(response).to have_http_status(401)
  end

  it 'should get success status after sign_out' do
    get '/'
    expect(response).to have_http_status(:success)

    delete '/auth/sign_out', params: @user.create_new_auth_token
    expect(response).to have_http_status(:success)
  end

  it 'should get error status after sign_out' do
    delete '/auth/sign_out'
    expect(response).to have_http_status(404)

    delete '/auth/sign_out', params: {
      'access-token': '',
      'token-type': '',
      'client': '',
      'expiry': '',
      'uid': ''
    }
    expect(response).to have_http_status(404)
  end
end
