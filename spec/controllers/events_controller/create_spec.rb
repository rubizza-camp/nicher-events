require 'rails_helper'

RSpec.describe Api::V1::EventsController, type: :controller do
  let!(:event_attributes) { %w[id name date description status organization available_to_edit users subscribed] }
  let(:organization) { create(:organization) }
  let(:organizer) { create(:user, role: :organizer, organization: organization) }

  describe 'POST #create' do
    let(:valid_params) { build(:event, user_id: organizer.id) }

    context 'when user is organizer' do
      before do
        @header = organizer.create_new_auth_token
        request.headers.merge!(@header)
      end

      context 'when params is valid' do
        it 'returns json with params of created event' do
          post :create, params: { event: valid_params.attributes }
          expect(json_response.keys).to eq(event_attributes)
          expect(json_response['name']).to eq(valid_params.name)
        end
      end

      context 'when params is invalid' do
        let(:invalid_params) { build(:event, name: nil, description: 'too short', date: nil, status: nil) }

        it 'returns message errors' do
          post :create, params: { event: invalid_params.attributes }
          @errors = ['Name can\'t be blank',
                     'Description is too short (minimum is 10 characters)',
                     'Date can\'t be blank',
                     'Status is not included in the list']
          expect(json_response).to eq(@errors)
        end
      end
    end

    context 'when user is attendee' do
      let(:attendee) { create(:user, role: :attendee) }

      before do
        @header = attendee.create_new_auth_token
        request.headers.merge!(@header)
      end

      it 'returns forbidden status' do
        post :create, params: { event: valid_params.attributes }
        expect(response).to have_http_status(:forbidden)
      end
    end

    context 'when user is unregistered' do
      it 'returns unauthorized status' do
        post :create, params: { event: valid_params.attributes }
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end
end
