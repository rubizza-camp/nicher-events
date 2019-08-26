require 'rails_helper'
# rubocop:disable Metrics/LineLength
# rubocop:disable Lint/AmbiguousBlockAssociation

RSpec.describe Api::V1::EventsController, type: :controller do
  let!(:event_attributes) { %w[id name date description status organization available_to_edit users attendance_id available_to_subscribed] }
  let(:organization) { create(:organization) }
  let(:organizer) { create(:user, role: :organizer, organization: organization) }

  describe 'POST #create' do
    let(:valid_event) { build(:event, user_id: organizer.id) }
    let(:create_action) { post :create, params: event_params }

    context 'when user is organizer' do
      before do
        @header = organizer.create_new_auth_token
        request.headers.merge!(@header)
      end

      context 'when params is valid' do
        let(:event_params) { { event: valid_event.attributes } }

        it 'returns json with params of created event' do
          expect { create_action }.to change { Event.all.count }.by(1)
          expect(json_response.keys.to_set).to eq(event_attributes.to_set)
          expect(json_response['name']).to eq(valid_event.name)
        end
      end

      context 'when params is invalid' do
        let(:invalid_event) { build(:event, name: nil, description: 'too short', date: nil, status: nil) }
        let(:event_params) { { event: invalid_event.attributes } }

        it 'returns message errors' do
          expect { create_action }.to_not change { Event.all.count }
          @errors = ['Name can\'t be blank',
                     'Date can\'t be blank',
                     'Description is too short (minimum is 10 characters)',
                     'Status is not included in the list']
          expect(json_response.to_set).to eq(@errors.to_set)
        end
      end
    end

    context 'when user is attendee' do
      let(:attendee) { create(:user, role: :attendee) }
      let(:event_params) { { event: valid_event.attributes } }

      before do
        @header = attendee.create_new_auth_token
        request.headers.merge!(@header)
      end

      it 'returns forbidden status' do
        post :create, params: { event: valid_event.attributes }
        expect { create_action }.to_not change { Event.all.count }
        expect(response).to have_http_status(:forbidden)
      end
    end

    context 'when user is unregistered' do
      let(:event_params) { { event: valid_event.attributes } }

      it 'returns unauthorized status' do
        expect { create_action }.to_not change { Event.all.count }
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end
end
# rubocop:enable Lint/AmbiguousBlockAssociation
# rubocop:enable Metrics/LineLength
