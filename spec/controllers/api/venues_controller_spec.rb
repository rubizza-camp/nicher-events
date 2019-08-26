require 'rails_helper'
# rubocop:disable Lint/AmbiguousBlockAssociation

RSpec.describe Api::V1::VenuesController, type: :controller do
  let(:organizer) { create(:user, role: :organizer) }

  describe 'GET #show' do
    let(:venue_attributes) { %w[id address description] }
    before do
      @header = organizer.create_new_auth_token
      request.headers.merge!(@header)
    end

    context 'when valid' do
      let(:venue) { create(:venue) }

      it 'returns json response with venue' do
        get :show, params: { id: venue.id }
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
      let(:create_action) { post :create, params: { venue: valid_venue.attributes } }

      it 'returns json with params of created venue' do
        expect { create_action }.to change { Venue.all.count }.by(1)
        expect(json_response.keys).to include('id', 'address', 'description', 'people_capacity')
      end
    end

    context 'when params is invalid' do
      let(:invalid_venue) { build(:venue, address: nil) }
      let(:create_action) { post :create, params: { venue: invalid_venue.attributes } }

      it 'returns message errors' do
        expect { create_action }.to_not change { Venue.all.count }
        expect(json_response).to include('Address can\'t be blank')
        expect(json_response).to include('Address is too short (minimum is 5 characters)')
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
        expect(response).to have_http_status(:no_content)
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
# rubocop:enable Lint/AmbiguousBlockAssociation
