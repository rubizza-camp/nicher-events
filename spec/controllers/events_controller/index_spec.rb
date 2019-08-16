require 'rails_helper'

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
        expect(json_response.dig(0, 'name')). to eq(social_events[0].name)
        expect(json_response.dig(1, 'name')). to eq(social_events[1].name)
        expect(json_response.dig(2, 'name')). to eq(social_events[2].name)
        expect(response).to have_http_status(:success)
      end
    end
  end
end
