require 'rails_helper'
require 'set'

RSpec.describe Api::V1::EventsController, type: :controller do
  describe 'GET #index' do
    let!(:event_attributes) { %w[id name date description status user_id] }
    let(:organizer) { create(:user, role: :organizer) }
    let!(:social_events) { create_list(:event, 3, status: :social, user_id: organizer.id) }
    let!(:confidential_events) { create_list(:event, 2, status: :confidential, user_id: organizer.id) }

    context 'when user is organizer' do
      before do
        @auth_token = organizer.create_new_auth_token
        request.headers.merge!(@auth_token)
      end

      it 'returns json with list of all events' do
        get :index
        expect(json_response.first.keys).to eq(event_attributes)
        expect(json_response.count).to eq(social_events.count + confidential_events.count)
      end
    end

    context 'when user is attendee' do
      let(:attendee) { create(:user, role: :attendee) }

      before do
        @auth_token = attendee.create_new_auth_token
        request.headers.merge!(@auth_token)
      end

      it 'returns json with list of social and conforming confidential events' do
        get :index
        expect(json_response.first.keys).to eq(event_attributes)
        expect(json_response.count).to eq(social_events.count)
      end
    end

    context 'when unregistered user' do
      it 'returns json with list of social events' do
        get :index
        expect(json_response.first.keys).to eq(event_attributes)
        expect(json_response.count).to eq(social_events.count)
        @response_event_status = json_response.map { |event| event['status'] }
        expect(@response_event_status).to all(be == 'social')
        @response_event_names = json_response.map { |event| event['name'] }
        @event_names = social_events.map { |event| event['name'] }
        expect(@response_event_names.to_set).to eq(@event_names.to_set)
        expect(response).to have_http_status(:success)
      end
    end
  end
end
