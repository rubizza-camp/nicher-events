require 'rails_helper'
# rubocop:disable Metrics/LineLength

RSpec.describe Api::V1::EventsController, type: :controller do
  let!(:event_attributes) { %w[id name date description status organization available_to_edit users available_to_subscribed subscribed] }
  let(:organization) { create(:organization) }
  let(:organizer) { create(:user, role: :organizer, organization: organization) }
  let(:event_of_current_user) { create(:event, user_id: organizer.id) }
  let(:second_organization) { create(:organization) }
  let(:second_organizer) { create(:user, role: :organizer, organization: second_organization) }
  let(:event_of_second_user) { create(:event, user_id: second_organizer.id) }

  describe 'PATCH #update' do
    let(:valid_event) { create(:event, user_id: organizer.id) }

    context 'when user is registered as organizer' do
      before do
        @header = organizer.create_new_auth_token
        request.headers.merge!(@header)
      end

      context 'event belongs to current user\'s organization' do
        it 'returns json with updated event' do
          patch :update, params: { id: event_of_current_user.id, event: valid_event.attributes }
          expect(json_response.keys).to eq(event_attributes)
          expect(json_response['name']).to eq(valid_event.name)
        end
      end

      context 'event doesn\'t belong to current user\'s organization' do
        it 'returns forbidden status' do
          patch :update, params: { id: event_of_second_user.id, event: valid_event.attributes }
          expect(response).to have_http_status(:forbidden)
        end
      end

      context 'when params is invalid' do
        let(:new_invalid_event) { build(:event, user_id: organizer.id, name: '') }

        it 'returns unprocessable_entity status' do
          patch :update, params: { id: event_of_current_user.id, event: new_invalid_event.attributes }
          expect(json_response).to include('Name can\'t be blank')
          expect(response).to have_http_status(:unprocessable_entity)
        end
      end

      context 'when event doesn\'t exist' do
        it 'returns not_found status' do
          patch :update, params: { id: -1, event: valid_event.attributes }
          expect(response).to have_http_status(:not_found)
        end
      end
    end

    context 'when user is attendee' do
      before do
        @user = create(:user)
        @header = @user.create_new_auth_token
        request.headers.merge!(@header)
      end

      it 'returns forbidden status' do
        delete :destroy, params: { id: event_of_current_user.id }
        expect(response).to have_http_status(:forbidden)
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
# rubocop:enable Metrics/LineLength
