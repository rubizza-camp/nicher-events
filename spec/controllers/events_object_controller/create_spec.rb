require 'rails_helper'
# rubocop:disable Lint/AmbiguousBlockAssociation
# rubocop:disable Metrics/LineLength

RSpec.describe Api::V1::EventObjectsController, type: :controller do
  let(:organization) { create(:organization) }
  let(:organizer) { create(:user, role: :organizer, organization: organization) }
  let(:errors) { ['Name can\'t be blank', 'Description is too short (minimum is 10 characters)', 'Location can\'t be blank'] }

  describe 'POST #create' do
    let(:valid_event_object) { build(:event_object) }
    let(:create_action) { post :create, params: event_object_params }

    context 'when user is organizer' do
      before do
        @header = organizer.create_new_auth_token
        request.headers.merge!(@header)
      end

      context 'when params is valid' do
        let(:file_attributes) {
          { file: fixture_file_upload('test_avatar.jpg', 'image/png') }
        }
        let(:event_object_params) { valid_event_object.attributes.merge! file_attributes }

        it 'event_object is created' do
          expect { create_action }.to change { EventObject.all.count }.by(1).and change { ActiveStorage::Attachment.count }.by(1)
          expect(json_response['name']).to eq(valid_event_object.name)
        end
      end

      context 'when params is invalid' do
        let(:invalid_event_object) { build(:event_object, name: nil, description: 'too short', file: nil) }
        let(:event_object_params) {  invalid_event_object.attributes }

        it 'event isn\'t created and returns message errors' do
          expect { create_action }.to_not change { Event.all.count }
          expect(json_response.to_set).to eq(errors.to_set)
        end
      end
    end

    context 'when user is attendee' do
      let(:attendee) { create(:user, role: :attendee) }
      let(:file_attributes) {
        { file: fixture_file_upload('test_avatar.jpg', 'image/png') }
      }
      let(:event_object_params) { valid_event_object.attributes.merge! file_attributes }

      before do
        @header = attendee.create_new_auth_token
        request.headers.merge!(@header)
      end

      it 'event object isn\'t created with forbidden status' do
        expect { create_action }.to_not change { Event.all.count }
        expect(response).to have_http_status(:forbidden)
      end
    end

    context 'when user is unregistered' do
      let(:file_attributes) {
        { file: fixture_file_upload('test_avatar.jpg', 'image/png') }
      }
      let(:event_object_params) { valid_event_object.attributes.merge! file_attributes }

      it 'event object isn\'t created with unauthorized status' do
        expect { create_action }.to_not change { Event.all.count }
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end
end

