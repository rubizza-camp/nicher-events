require 'rails_helper'

describe 'SignUp', type: :request do
  let!(:user) { build(:user) }
  it 'should get success status' do
    get '/#/sign_up'
    expect(response).to have_http_status(:success)

    post '/auth', params: { first_name: user.first_name, last_name: user.last_name, email: user.email,
                            phone: user.phone, password: user.password }
    expect(response).to have_http_status(:success)
  end

  it 'should get error status, because incomplete data or incorrect data' do
    post '/auth', params: { first_name: user.first_name, last_name: user.last_name,
                            phone: user.phone, password: user.password }
    expect(response).to have_http_status(422)

    post '/auth', params: { first_name: user.first_name, last_name: user.last_name, email: user.email,
                            phone: user.phone }
    expect(response).to have_http_status(422)

    post '/auth', params: { first_name: user.first_name, last_name: user.last_name, email: user.password,
                            phone: user.phone, password: user.email }
    expect(response).to have_http_status(422)

    post '/auth', params: { last_name: user.last_name, email: user.password, phone: user.phone, password: user.email }
    expect(response).to have_http_status(422)

    post '/auth', params: { first_name: user.first_name, email: user.password, phone: user.phone, password: user.email }
    expect(response).to have_http_status(422)

    post '/auth', params: { first_name: user.first_name, last_name: user.last_name,
                            email: user.password, password: user.email }
    expect(response).to have_http_status(422)
  end
end
