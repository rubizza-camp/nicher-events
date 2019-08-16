require 'rails_helper'

RSpec.describe Api::V1::EventsController, type: :controller do
  let!(:event_attributes) { %w[id name date description status user_id] }
  let(:organizer) { create(:user, role: :organizer) }
  let(:event_of_current_user) { create(:event, user_id: organizer.id) }

  describe 'PATCH #update' do
    let(:valid_event) { create(:event, user_id: organizer.id) }

    context 'when user is registered' do
      before do
        @header = organizer.create_new_auth_token
        request.headers.merge!(@header)
      end

      context 'when user is creator' do
        let(:new_event) { build(:event, user_id: organizer.id) }

        it 'returns json with updated event' do
          patch :update, params: { id: event_of_current_user.id, event: new_event.attributes }
          expect(json_response.keys).to eq(event_attributes)
          expect(json_response['name']).to eq(new_event.name)
        end
      end

      context 'when params is invalid' do
        let(:new_invalid_event) { build(:event, user_id: organizer.id, name: '') }

        it 'returns not_found status' do
          patch :update, params: { id: event_of_current_user.id, event: new_invalid_event.attributes }
          expect(json_response).to include('Name can\'t be blank')
        end
      end
    end

    context 'when user is unregistered' do
      it 'returns unauthorized status' do
        patch :update, params: { id: valid_event.id, event: valid_event.attributes }
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end
end
