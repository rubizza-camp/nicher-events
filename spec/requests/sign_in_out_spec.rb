require 'rails_helper'

describe 'SignInOut', type: :request do
  include ActionController::RespondWith
  let(:user) { create(:user) }
  it 'should get success status' do
    get '/#/sign_in'
    expect(response).to have_http_status(:success)

    post '/auth/sign_in', params: { email: user.email, password: user.password }
    expect(response).to have_http_status(:success)
  end

  it 'should get error status, because incomplete data or incorrect data' do
    post '/auth/sign_in', params: { password: user.password }
    expect(response).to have_http_status(401)

    post '/auth/sign_in', params: { email: user.email }
    expect(response).to have_http_status(401)

    post '/auth/sign_in', params: { email: user.password, password: user.email }
    expect(response).to have_http_status(401)
  end

  it 'should get success status' do
    get '/'
    expect(response).to have_http_status(:success)

    delete '/auth/sign_out', params: user.create_new_auth_token
    expect(response).to have_http_status(:success)
  end

  it 'should get error status, because empty data or incorrect data' do
    delete '/auth/sign_out'
    expect(response).to have_http_status(404)

    delete '/auth/sign_out', params: {}
    expect(response).to have_http_status(404)
  end
end
