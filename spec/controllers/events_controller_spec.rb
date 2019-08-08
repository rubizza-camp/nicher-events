require 'rails_helper'

RSpec.describe Api::EventsController, type: :controller do
  describe 'GET #index' do
    it 'should get index' do
      get :index
      expect(response).to have_http_status(:success)
    end
  end

  describe 'GET #show' do
    let(:event_attributes) { %w[id name date description status user_id] }

    context 'when valid' do
      let(:event) { create(:event) }
      it 'returns json response with event' do
        get :show, params: { id: event.id }
        json_response = JSON.parse(response.body)

        expect(json_response.keys).to eq(event_attributes)
        expect(json_response['name']).to eq(event.name)
      end
    end

    context 'when invalid' do
      it 'return nill' do
        get :show, params: { id: -1 }
        json_response = JSON.parse(response.body)

        expect(json_response).to be_nil
      end
    end
  end

  describe 'GET #create' do
    context 'when valid' do
      let(:event) { create(:event) }

      it 'increase count of events in db' do
        expect { create(:event) }.to change { Event.all.count }.by(1)
      end

      it 'object name the same as db record' do
        expect(event.name).to eq(Event.find(event.id).name)
      end
    end

    context 'when invalid' do
      it 'count of events in db shouldn\'t change' do
        expect { build(:event, name: nil) }.to change { Event.all.count }.by(0)
      end
    end
  end

  describe 'GET #destroy' do
    let!(:event) { create(:event) }
    it 'decrease count of events in db' do
      expect { get :destroy, params: { id: event.id } }.to change { Event.all.count }.by(-1)
    end
  end
end
