require 'rails_helper'

RSpec.describe Api::V1::EventsController, type: :controller do
  let!(:event_attributes) { %w[id name date description status user_id] }
  let(:organizer) { create(:user, role: :organizer) }

  describe 'GET #show' do
    context 'when status event is social' do
      let(:social_event) { create(:event, status: :social, user_id: organizer.id) }

      it 'returns json response with event' do
        get :show, params: { id: social_event.id }
        expect(json_response.keys).to eq(event_attributes)
        expect(json_response['name']).to eq(social_event.name)
        expect(json_response['description']).to eq(social_event.description)
        expect(json_response['date']).to eq(Time.parse(social_event.date.to_s).strftime('%Y-%m-%dT%H:%M'))
        expect(json_response['status']).to eq(social_event.status)
      end
    end
    context 'when status event is confidential' do
      let(:confidential_event) { create(:event, status: :confidential, user_id: organizer.id) }

      context 'user is\'t organizer' do
        let(:attendee) { create(:user, role: :attendee) }

        before do
          @auth_token = attendee.create_new_auth_token
          request.headers.merge!(@auth_token)
        end
        it 'returns unauthorized status' do
          get :show, params: { id: confidential_event.id }
          expect(response).to have_http_status(:unauthorized)
        end
      end

      context 'when user is organizer' do
        before do
          @auth_token = organizer.create_new_auth_token
          request.headers.merge!(@auth_token)
        end
        it 'returns json response with event' do
          get :show, params: { id: confidential_event.id }
          expect(json_response.keys).to eq(event_attributes)
          expect(json_response['name']).to eq(confidential_event.name)
        end
      end
    end

    context 'when params is invalid' do
      it 'returns not_found status' do
        get :show, params: { id: -1 }
        expect(response).to have_http_status(:not_found)
      end
    end
  end
end
