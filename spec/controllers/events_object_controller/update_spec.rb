require 'rails_helper'

RSpec.describe Api::V1::EventObjectsController, type: :controller do
  let(:organization) { create(:organization) }
  let(:organizer) { create(:user, role: :organizer, organization: organization) }
  let(:event_object) { create(:event_object) }

  describe 'PATCH #update' do
    let(:valid_event_object) { create(:event_object) }

    context 'when user is registered as organizer' do
      let(:file_attributes) {
        { id: event_object.id, file: fixture_file_upload('test_avatar.jpg', 'image/png') }
      }
      let(:event_object_params) { valid_event_object.attributes.merge! file_attributes }

      before do
        @header = organizer.create_new_auth_token
        request.headers.merge!(@header)
      end

      it 'returns json with updated event object' do
        patch :update, params: event_object_params
        expect(json_response['name']).to eq(valid_event_object.name)
        expect(json_response['location']).not_to eq(valid_event_object.location)
      end

      context 'when params is invalid' do
        let(:id_attributes) {
          { id: event_object.id }
        }
        let(:invalid_event_object) { build(:event_object, name: '') }
        let(:invalid_event_object_params) { invalid_event_object.attributes.merge! file_attributes }

        it 'returns unprocessable_entity status' do
          patch :update, params: invalid_event_object_params
          expect(json_response).to include('Name can\'t be blank')
          expect(response).to have_http_status(:unprocessable_entity)
        end
      end

      context 'when event object doesn\'t exist' do
        it 'returns not_found status' do
          patch :update, params: { id: -1 }
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
        patch :update, params: { id: event_object.id }
        expect(response).to have_http_status(:forbidden)
      end
    end

    context 'when user is unregistered' do
      it 'returns unauthorized status' do
        patch :update, params: { id: event_object.id }
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end
end
