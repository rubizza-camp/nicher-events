require 'rails_helper'

describe 'SignInOut', type: :request do
  include ActionController::RespondWith
  before(:each) do
    @user1 = create(:user)
  end

  it 'should get success status after sign_in' do
    get '/#/sign_in'
    expect(response).to have_http_status(:success)

    post '/auth/sign_in', params: { email: @user1.email, password: @user1.password }
    expect(response).to have_http_status(:success)
  end

  it 'should get error status after sign_in' do
    post '/auth/sign_in', params: { email: 'usr@gmail.com', password: '123456' }
    expect(response).to have_http_status(401)

    post '/auth/sign_in', params: { email: 'user@gmail.com', password: '12345' }
    expect(response).to have_http_status(401)

    post '/auth/sign_in', params: { email: 'example@gmail.', password: '123456' }
    expect(response).to have_http_status(401)
  end

  it 'should get success status after sign_out' do
    get '/'
    expect(response).to have_http_status(:success)

    delete '/auth/sign_out', params: @user1.create_new_auth_token
    expect(response).to have_http_status(:success)
  end

  it 'should get error status after sign_out' do
    delete '/auth/sign_out'
    expect(response).to have_http_status(404)

    delete '/auth/sign_out', params: {
      'access-token': 'vMzlOcJkftWkaU382TO2bg',
      'token-type': 'Bearer',
      'client': 'OWd3ZdcglX5nXDjg5bYEbA',
      'expiry': '1566226122',
      'uid': 'example@mail.ru'
    }
    expect(response).to have_http_status(404)
  end
end
