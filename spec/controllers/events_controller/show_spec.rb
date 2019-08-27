require 'rails_helper'

RSpec.describe Api::V1::EventsController, type: :controller do
  let!(:event_attributes) { %w[id name date description status organization available_for_edit users attendance_id] }
  let(:current_organization) { create(:organization) }
  let(:current_organizer) { create(:user, role: :organizer, organization: current_organization) }
  let(:organization) { create(:organization) }
  let(:organizer) { create(:user, role: :organizer, organization: organization) }

  describe 'GET #show' do
    context 'when status event is social' do
      let(:social_event) { create(:event, status: :social, user: current_organizer) }

      it 'returns json response with event' do
        get :show, params: { id: social_event.id }
        expect(json_response.keys.to_set).to eq(event_attributes.to_set)
        expect(json_response['name']).to eq(social_event.name)
        expect(json_response['description']).to eq(social_event.description)
        expect(json_response['date']).to eq(Time.parse(social_event.date.to_s).strftime('%Y-%m-%dT%H:%M'))
        expect(json_response['status']).to eq(social_event.status)
      end
    end
    context 'when status event is confidential' do
      context 'user is\'t organizer' do
        let(:attendee) { create(:user, role: :attendee) }
        let(:confidential_event) { create(:event, status: :confidential, user: current_organizer) }

        before do
          @auth_token = attendee.create_new_auth_token
          request.headers.merge!(@auth_token)
        end

        it 'returns forbidden status' do
          get :show, params: { id: confidential_event.id }
          expect(response).to have_http_status(:forbidden)
        end
      end

      context 'when user is organizer' do
        before do
          @auth_token = current_organizer.create_new_auth_token
          request.headers.merge!(@auth_token)
        end

        context 'when event belongs to current organization' do
          let(:confidential_event) { create(:event, status: :confidential, user: current_organizer) }

          it 'returns json response with event' do
            get :show, params: { id: confidential_event.id }
            expect(json_response.keys.to_set).to eq(event_attributes.to_set)
            expect(json_response['name']).to eq(confidential_event.name)
          end
        end

        context 'when event doesn\'t belong to current organization' do
          let(:confidential_event) { create(:event, status: :confidential, user: organizer) }

          it 'returns forbidden status' do
            get :show, params: { id: confidential_event.id }
            expect(response).to have_http_status(:forbidden)
          end
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
