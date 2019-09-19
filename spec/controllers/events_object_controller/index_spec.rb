require 'rails_helper'
require 'set'

RSpec.describe Api::V1::EventObjectsController, type: :controller do
  describe 'GET #index' do
    let(:attendee) { create(:user, role: :attendee) }
    let!(:event_objects) { create(:event_object) }

    context 'when user is attendee' do
      before do
        @header = attendee.create_new_auth_token
        request.headers.merge!(@header)
      end

      it 'returns json with list of all event objects' do
        get :index
        expect(json_response.first['name']).to eq(event_objects.name)
      end
    end

    context 'when unregistered user' do
      it 'returns unauthorized status' do
        get :index
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end
end
