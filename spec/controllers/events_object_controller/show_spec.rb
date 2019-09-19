require 'rails_helper'

RSpec.describe Api::V1::EventObjectsController, type: :controller do

  describe 'GET #show' do
    let(:user) { create(:user) }
    let(:event_object) { create(:event_object) }

    context 'when user is authorized' do
      before do
        @header = user.create_new_auth_token
        request.headers.merge!(@header)
      end

      context 'when valid params' do
        it 'returns json response with event_object' do
          get :show, params: { id: event_object.id }
          expect(json_response['name']).to eq(event_object.name)
          expect(json_response['location']).to eq(event_object.location)
        end
      end

      context 'when invalid params' do
        it 'returns error status' do
          get :show, params: { id: 0 }
          expect(response).to have_http_status(:not_found)
        end
      end
    end

    context 'when user is unauthorized' do
      let(:user) { build(:user) }

      it 'returns unauthorized status' do
        get :show, params: { id: event_object.id }
        expect(response).to have_http_status(401)
      end
    end
  end
end
