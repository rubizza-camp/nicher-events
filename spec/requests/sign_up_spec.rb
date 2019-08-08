require 'rails_helper'

describe 'SignUp', type: :request do
  before(:each) do
    @user = build(:user)
  end
  it 'should get success status' do
    get '/#/sign_up'
    expect(response).to have_http_status(:success)

    post '/auth', params: { email: @user.email, password: @user.password }
    expect(response).to have_http_status(:success)
  end

  it 'should get error status' do
    post '/auth', params: { email: '', password: @user.password }
    expect(response).to have_http_status(422)

    post '/auth', params: { email: @user.email, password: '' }
    expect(response).to have_http_status(422)

    post '/auth', params: { email: @user.password, password: @user.email }
    expect(response).to have_http_status(422)
  end
end
