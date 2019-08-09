require 'rails_helper'

RSpec.describe Api::WelcomeController, type: :controller do
  describe 'GET index' do
    it 'should get index' do
      get :index
      expect(response).to have_http_status(:success)
    end
  end
end
