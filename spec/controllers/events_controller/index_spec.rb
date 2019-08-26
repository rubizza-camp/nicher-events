require 'rails_helper'
require 'set'
# rubocop:disable Metrics/LineLength

RSpec.describe Api::V1::EventsController, type: :controller do
  describe 'GET #index' do
    let!(:event_attributes) { %w[id name date description status organization available_to_edit users available_to_subscribed subscribed] }
    let(:current_organization) { create(:organization) }
    let(:current_organizer) { create(:user, role: :organizer, organization: current_organization) }
    let!(:current_social_events) { create_list(:event, 3, status: :social, user: current_organizer) }
    let!(:current_confidential_events) { create_list(:event, 2, status: :confidential, user: current_organizer) }
    let(:second_organization) { create(:organization) }
    let(:second_organizer) { create(:user, role: :organizer, organization: second_organization) }
    let!(:social_events) { create_list(:event, 1, status: :social, user: second_organizer) }
    let!(:confidential_events) { create_list(:event, 4, status: :confidential, user: second_organizer) }

    context 'when user is organizer' do
      before do
        @auth_token = current_organizer.create_new_auth_token
        request.headers.merge!(@auth_token)
      end

      it 'returns json with list of all social events and events of current user organization' do
        current_organizer.organization = current_organization
        second_organizer.organization = second_organization

        get :index
        expect(json_response.first.keys).to eq(event_attributes)
        @response_event_names = json_response.map { |event| event['name'] }
        @event_names = current_social_events.map { |event| event['name'] }
        @event_names += current_confidential_events.map { |event| event['name'] }
        @event_names += social_events.map { |event| event['name'] }
        expect(@response_event_names.to_set).to eq(@event_names.to_set)
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
        expect(json_response.count).to eq(social_events.count + current_social_events.count)
      end
    end

    context 'when unregistered user' do
      it 'returns json with list of social events' do
        get :index
        expect(json_response.first.keys).to eq(event_attributes)
        @response_event_status = json_response.map { |event| event['status'] }
        expect(@response_event_status).to all(be == 'social')
        @response_event_names = json_response.map { |event| event['name'] }
        @event_names = social_events.map { |event| event['name'] }
        @event_names += current_social_events.map { |event| event['name'] }
        expect(@response_event_names.to_set).to eq(@event_names.to_set)
        expect(response).to have_http_status(:success)
      end
    end
  end
end
# rubocop:enable Metrics/LineLength
