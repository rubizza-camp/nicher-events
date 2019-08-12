require 'rails_helper'

describe 'SignUp', type: :request do
  let!(:user) { build(:user) }

  context 'should get success status when sign_up' do
    it 'get sign_up page' do
      get '/#/sign_up'
      expect(response).to have_http_status(:success)
    end
    it 'with right params' do
      post '/auth', params: { first_name: user.first_name, last_name: user.last_name, email: user.email,
                              phone: user.phone, password: user.password, password_confirmation: user.password }
      expect(response).to have_http_status(:success)
    end
  end

  context 'should get error status when sign up' do
    it 'without email' do
      post '/auth', params: { first_name: user.first_name, last_name: user.last_name,
                              phone: user.phone, password: user.password }
      expect(response).to have_http_status(422)
    end

    it 'without password' do
      post '/auth', params: { first_name: user.first_name, last_name: user.last_name, email: user.email,
                              phone: user.phone }
      expect(response).to have_http_status(422)
    end

    it 'email and password are swapped' do
      post '/auth', params: { first_name: user.first_name, last_name: user.last_name, email: user.password,
                              phone: user.phone, password: user.email }
      expect(response).to have_http_status(422)
    end

    it 'without first name' do
      post '/auth', params: { last_name: user.last_name, email: user.password, phone: user.phone, password: user.email }
      expect(response).to have_http_status(422)
    end

    it 'without last name' do
      post '/auth', params: { first_name: user.first_name, email: user.password, phone: user.phone,
                              password: user.email }
      expect(response).to have_http_status(422)
    end

    it 'without phone' do
      post '/auth', params: { first_name: user.first_name, last_name: user.last_name,
                              email: user.password, password: user.email }
      expect(response).to have_http_status(422)
    end
  end
end
