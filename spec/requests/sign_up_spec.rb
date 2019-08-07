require 'rails_helper'

describe 'SignUp', type: :request do
  before(:each) do
    @user2 = build(:user)
  end
  it 'should get success status' do
    get '/#/sign_up'
    expect(response).to have_http_status(:success)

    post '/auth', params: { email: @user2.email, password: @user2.password }
    expect(response).to have_http_status(:success)
  end

  it 'should get error status' do
    post '/auth', params: { email: '', password: 'password' }
    expect(response).to have_http_status(422)

    post '/auth', params: { email: 'example@gmail.com', password: '12345' }
    expect(response).to have_http_status(422)

    post '/auth', params: { email: 'example@gmail.', password: '123456' }
    expect(response).to have_http_status(422)
  end
end
