require 'rails_helper'

RSpec.describe Api::V1::VenuesController, type: :controller do
  let(:organizer) { create(:user, role: :organizer) }

  describe 'GET #show' do
    let(:venue_attributes) { %w[id address description] }

    context 'when valid' do
      let(:venue) { create(:venue) }
      it 'returns json response with venue' do
        get :show, params: { id: venue.id }
        json_response
        expect(json_response.keys).to include('id', 'address', 'description', 'people_capacity')
      end
    end
  end

  describe 'POST #create' do
    before do
      @header = organizer.create_new_auth_token
      request.headers.merge!(@header)
    end

    context 'when params is valid' do
      let(:valid_venue) { build(:venue) }

      it 'returns json with params of created venue' do
        post :create, params: { venue: valid_venue.attributes }
        expect(json_response.keys).to include('id', 'address', 'description', 'people_capacity')
      end
    end

    context 'when params is invalid' do
      let(:invalid_venue) { build(:venue, address: nil) }

      it 'returns message errors' do
        post :create, params: { venue: invalid_venue.attributes }
        expect(json_response.count).to eq(2)
      end
    end
  end

  describe 'DELETE #destroy' do
    before do
      @header = organizer.create_new_auth_token
      request.headers.merge!(@header)
    end

    context 'when params is valid' do
      let(:valid_venue) { create(:venue) }

      it 'returns no_content status' do
        get :destroy, params: { id: valid_venue.id }
        venue = assigns(:venue)
        expect(valid_venue.address).to eq(venue.address)
        expect(response).to have_http_status(:ok)
      end
    end

    context 'when params is invalid' do
      it 'returns not_found status' do
        get :destroy, params: { id: -1 }
        expect(response).to have_http_status(:not_found)
      end
    end
  end
end
