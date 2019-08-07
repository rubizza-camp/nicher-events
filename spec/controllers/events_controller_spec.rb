require 'rails_helper'

RSpec.describe Api::V1::EventsController, type: :controller do
  let(:event_attributes) { %w[id name date description status user_id] }

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
      it 'return not_found status' do
        get :show, params: { id: -1 }
        expect(json_response['status']).to eq('not_found')
      end
    end
  end

  describe 'POST #create' do
    context 'when valid' do
      let(:valid_params) do
        { name: 'first event',
          description: 'it is enough long description',
          status: 'social',
          date: '2019-11-08T05:00' }
      end

      it 'return json with params of created event' do
        post :create, params: { event: valid_params }
        event = assigns(:event)
        expect(event.name).to eq(valid_params[:name])
        expect(json_response.keys).to eq(event_attributes)
        expect(json_response['name']).to eq(valid_params[:name])
      end
    end

    context 'when invalid' do
      let(:invalid_params) do
        { name: nil,
          description: 'so short',
          status: 'social',
          date: '2019-11-08T05:00' }
      end

      it 'return message errors' do
        post :create, params: { event: invalid_params }
        event = assigns(:event)
        expect(event.errors.messages[:name].first).to eq('can\'t be blank')
        expect(event.errors.messages[:description].first).to eq('is too short (minimum is 10 characters)')
      end
    end
  end

  describe 'GET #destroy' do
    context 'when valid' do
      let(:event_valid) { create(:event) }

      it 'return params of deleted event' do
        get :destroy, params: { id: event_valid.id }
        event = assigns(:event)
        expect(event_valid.name).to eq(event.name)
      end
    end
    context 'when invalid' do
      it 'return not_found status' do
        get :destroy, params: { id: -1 }
        expect(json_response['status']).to eq('not_found')
      end
    end
  end
end
