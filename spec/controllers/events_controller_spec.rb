require 'rails_helper'

RSpec.describe Api::V1::EventsController, type: :controller do
  let!(:event_attributes) { %w[id name date description status user_id] }

  describe 'GET #index' do
    it 'should get index' do
      get :index
      expect(response).to have_http_status(:success)
    end
  end

  describe 'GET #show' do
    context 'when valid' do
      let(:event) { create(:event) }

      it 'returns json response with event' do
        get :show, params: { id: event.id }
        expect(json_response.keys).to eq(event_attributes)
        expect(json_response['name']).to eq(event.name)
      end
    end

    context 'when invalid' do
      it 'returns not_found status' do
        get :show, params: { id: -1 }
        expect(json_response['status']).to eq('not_found')
      end
    end
  end

  describe 'POST #create' do
    context 'when valid' do
      let(:valid_event) { build(:event) }

      it 'returns json with params of created event' do
        post :create, params: { event: valid_event.attributes }
        expect(json_response.keys).to eq(event_attributes)
        expect(json_response['name']).to eq(valid_event.name)
      end
    end

    context 'when invalid' do
      let(:invalid_event) { build(:event, name: nil, description: 'too short') }

      it 'returns message errors' do
        post :create, params: { event: invalid_event.attributes }
        expect(json_response[0]).to eq('Name can\'t be blank')
        expect(json_response[1]).to eq('Description is too short (minimum is 10 characters)')
      end
    end
  end

  describe 'GET #destroy' do
    context 'when valid' do
      let(:valid_event) { create(:event) }

      it 'returns params of deleted event' do
        get :destroy, params: { id: valid_event.id }
        event = assigns(:event)
        expect(valid_event.name).to eq(event.name)
      end
    end

    context 'when invalid' do
      it 'returns not_found status' do
        get :destroy, params: { id: -1 }
        expect(json_response['status']).to eq('not_found')
      end
    end
  end
end
