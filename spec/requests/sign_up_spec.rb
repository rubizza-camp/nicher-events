require 'rails_helper'

describe 'SignUp', type: :request do
  let!(:user) { build(:user) }

  context 'right params when sign_up' do
    it 'return sign_up page' do
      get '/#/sign_up'
      expect(response).to have_http_status(:success)
    end
    it 'return success status' do
      post '/auth', params: { first_name: user.first_name, last_name: user.last_name, email: user.email,
                              phone: user.phone, password: user.password, password_confirmation: user.password }
      expect(response).to have_http_status(:success)
    end
  end

  context 'when blank one of fields' do
    it 'return email cant be blank' do
      post '/auth', params: { first_name: user.first_name, last_name: user.last_name,
                              phone: user.phone, password: user.password }
      expect(JSON.parse(response.body)['errors']['full_messages']).to include("Email can't be blank")
    end

    it 'return password cant be blank' do
      post '/auth', params: { first_name: user.first_name, last_name: user.last_name, email: user.email,
                              phone: user.phone }
      expect(JSON.parse(response.body)['errors']['full_messages']).to include("Password can't be blank")
    end

    it 'return first_name cant be blank' do
      post '/auth', params: { last_name: user.last_name, email: user.email, phone: user.phone, password: user.password }
      expect(JSON.parse(response.body)['errors']['full_messages']).to include("First name can't be blank")
    end

    it 'return last name cant be blank' do
      post '/auth', params: { first_name: user.first_name, email: user.email, phone: user.phone,
                              password: user.password }
      expect(JSON.parse(response.body)['errors']['full_messages']).to include("Last name can't be blank")
    end

    it 'return phone cant be blank' do
      post '/auth', params: { first_name: user.first_name, last_name: user.last_name,
                              email: user.email, password: user.password }
      expect(JSON.parse(response.body)['errors']['full_messages']).to include("Phone can't be blank")
    end
  end

  context 'when incorrect email' do
    it 'return error message email is not an email' do
      post '/auth', params: { first_name: user.first_name, last_name: user.last_name, email: user.password,
                              phone: user.phone, password: user.email }
      expect(JSON.parse(response.body)['errors']['full_messages']).to include('Email is not an email')
    end
  end

  context 'when phone is too short' do
    it 'return error message' do
      post '/auth', params: { first_name: user.first_name, last_name: user.last_name, email: user.email,
                              phone: '1234', password: user.password }
      expect(JSON.parse(response.body)['errors']['full_messages'].to_s).to include('Phone is too short')
    end
  end
end
