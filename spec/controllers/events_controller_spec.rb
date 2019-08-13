require 'rails_helper'

RSpec.describe Api::V1::EventsController, type: :controller do
  let!(:event_attributes) { %w[id name date description status user_id] }
  let(:organizer) { create(:user) }
  let(:event_of_current_user) { create(:event, user_id: organizer.id) }

  describe 'GET #index' do
    let!(:social_events) { create_list(:event, 3, status: :social, user_id: organizer.id) }
    let!(:confidential_events) { create_list(:event, 3, status: :confidential, user_id: organizer.id) }

    context 'when user is organizer' do
      it 'returns json with list of all events' do
      end
    end

    context 'when user is attendee' do
      it 'returns json with list of social and conforming confidential events' do
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

  describe 'GET #show' do
    context 'when params is valid' do
      context 'status event is social' do
        let(:event) { create(:event, status: :social, user_id: organizer.id) }

        it 'returns json response with event' do
          get :show, params: { id: event.id }
          expect(json_response.keys).to eq(event_attributes)
          expect(json_response['name']).to eq(event.name)
          expect(json_response['description']).to eq(event.description)
          expect(json_response['date']).to eq(Time.parse(event.date.to_s).strftime('%Y-%m-%dT%H:%M'))
          expect(json_response['status']).to eq(event.status)
        end
      end
      context 'status event is confidential' do
      end
    end

    context 'when params is invalid' do
      it 'returns not_found status' do
        get :show, params: { id: -1 }
        expect(response).to have_http_status(:not_found)
      end
    end
  end

  describe 'POST #create' do
    let(:valid_event) { create(:event, user_id: organizer.id) }
    context 'when user is registered' do
      before do
        @user = create(:user)
        @header = @user.create_new_auth_token
        request.headers.merge!(@header)
      end
      context 'when params is valid' do
        it 'returns json with params of created event' do
          post :create, params: { event: valid_event.attributes }
          expect(json_response.keys).to eq(event_attributes)
          expect(json_response['name']).to eq(valid_event.name)
        end
      end

      context 'when params is invalid' do
        let(:invalid_event) { build(:event, name: nil, description: 'too short', date: nil, status: nil) }

        it 'returns message errors' do
          post :create, params: { event: invalid_event.attributes }
          expect(json_response[0]).to eq('Name can\'t be blank')
          expect(json_response[1]).to eq('Description is too short (minimum is 10 characters)')
          expect(json_response[2]).to eq('Date can\'t be blank')
          expect(json_response[3]).to eq('Status is not included in the list')
        end
      end
    end

    context 'when user is unregistered' do
      it 'can\'t be enable' do
        post :create, params: { event: valid_event.attributes }
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe 'DELETE #destroy' do
    context 'when user is registered' do
      before do
        @header = organizer.create_new_auth_token
        request.headers.merge!(@header)
      end

      context 'when user is creator' do
        it 'returns no_content status' do
          delete :destroy, params: { id: event_of_current_user.id }
          expect(response).to have_http_status(:no_content)
        end
      end

      context 'when params is invalid' do
        it 'returns not_found status' do
          delete :destroy, params: { id: -1 }
          expect(response).to have_http_status(:not_found)
        end
      end
    end

    context 'when user isn\'t creator of this event' do
      before do
        @user = create(:user)
        @header = organizer.create_new_auth_token
        request.headers.merge!(@header)
      end

      it 'returns not_found status' do
        delete :destroy, params: { id: @user.id }
        expect(response).to have_http_status(:not_found)
      end
    end

    context 'when user is unregistered' do
      it 'can\'t be enable' do
        post :create, params: { event: event_of_current_user.attributes }
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe 'PATCH #update' do
    let(:valid_event) { create(:event, user_id: organizer.id) }
    context 'when user is registered' do
      before do
        @header = organizer.create_new_auth_token
        request.headers.merge!(@header)
      end

      context 'when user is creator' do
        let(:new_event) { build(:event, user_id: organizer.id) }
        it 'returns json with updated event' do
          patch :update, params: { id: event_of_current_user.id, event: new_event.attributes }
          expect(json_response.keys).to eq(event_attributes)
          expect(json_response['name']).to eq(new_event.name)
        end
      end

      context 'when params is invalid' do
        let(:new_invalid_event) { build(:event, user_id: organizer.id, name: '') }
        it 'returns not_found status' do
          patch :update, params: { id: event_of_current_user.id, event: new_invalid_event.attributes }
          expect(json_response[0]).to eq('Name can\'t be blank')
        end
      end
    end

    context 'when user is unregistered' do
      it 'can\'t be enable' do
        patch :update, params: { id: valid_event.id, event: valid_event.attributes }
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end
end
