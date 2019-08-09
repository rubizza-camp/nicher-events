require 'rails_helper'

RSpec.describe Api::VenuesController, type: :controller do
  describe 'GET #show' do
    let(:venue_attributes) { %w[id address description people_capacity] }

    context 'when valid' do
      let(:venue) { create(:venue) }
      it 'returns json response with venue' do
        get :show, params: { id: venue.id }
        json_response

        expect(json_response.keys).to eq(venue_attributes)
        expect(json_response['address']).to eq(venue.address)
      end
    end
  end

  describe 'GET #create' do
    context 'when valid' do
      let(:venue) { create(:venue) }

      it 'increase count of venues in db' do
        expect { create(:venue) }.to change { Venue.all.count }.by(1)
      end

      it 'object address the same as db record' do
        expect(venue.address).to eq(Venue.find(venue.id).address)
      end
    end

    context 'when invalid' do
      it 'count of venues in db shouldn\'t change' do
        expect { build(:venue, address: nil) }.to change { Venue.all.count }.by(0)
      end
    end
  end

  describe 'GET #destroy' do
    let!(:venue) { create(:venue) }
    it 'decrease count of venues in db' do
      expect { get :destroy, params: { id: venue.id } }.to change { Venue.all.count }.by(-1)
    end
  end
end
