require 'rails_helper'

describe 'SignOut' do
  let(:user) { create(:user) }

  it 'get main page' do
    get '/'
    expect(response).to have_http_status(:success)
  end

  context 'when right params' do
    it 'return success status' do
      delete '/auth/sign_out', params: user.create_new_auth_token
      expect(response).to have_http_status(:success)
    end
  end

  context 'when incorrect params' do
    it 'return error status' do
      delete '/auth/sign_out', params: {}
      expect(response).to have_http_status(404)
    end
  end
end
