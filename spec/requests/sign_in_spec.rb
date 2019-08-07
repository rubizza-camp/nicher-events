require 'rails_helper'

describe 'SignIn', type: :request do

  it 'should get success status' do
    get '/#/sign_in'
    expect(response).to have_http_status(:success)

    post '/auth/sign_in', params: { email: 'user@gmail.com', password: '123456' }
    expect(response).to have_http_status(:success)
  end

  it 'should get error status' do
    post '/auth/sign_in', params: { email: 'usr@gmail.com', password: '123456' }
    expect(response).to have_http_status(401)

    post '/auth/sign_in', params: { email: 'user@gmail.com', password: '12345' }
    expect(response).to have_http_status(401)

    post '/auth/sign_in', params: { email: 'example@gmail.', password: '123456' }
    expect(response).to have_http_status(401)
  end
end
