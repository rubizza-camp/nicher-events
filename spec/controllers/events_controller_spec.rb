require 'rails_helper'

RSpec.describe Api::V1::EventsController, type: :controller do
  let!(:event_attributes) { %w[id name date description status user_id] }

  describe 'GET #index' do
    let!(:events) { create_list(:event, 3) }

    context 'when user is organizer' do
      it 'returns json with list of all events' do
        get :index
        expect(json_response.first.keys).to eq(event_attributes)
        expect(json_response.dig(0, 'name')). to eq(events[0].name)
        expect(json_response.dig(1, 'name')). to eq(events[1].name)
        expect(json_response.dig(2, 'name')). to eq(events[2].name)
        expect(response).to have_http_status(:success)
      end
    end

    context 'when user is attendee' do
      it 'returns json with list of public and conforming private events' do
      end
    end

    context 'when unregistered user' do
      it 'returns json with list of public events' do
      end
    end
  end

  describe 'GET #show' do
    context 'when params is valid' do
      context 'status event is public' do
        let(:event) { create(:event, status: :social) }

        it 'returns json response with event' do
          get :show, params: { id: event.id }
          expect(json_response.keys).to eq(event_attributes)
          expect(json_response['name']).to eq(event.name)
          expect(json_response['description']).to eq(event.description)
          expect(json_response['date']).to eq(Time.parse(event.date.to_s).strftime('%Y-%d-%mT%H:%M'))
          expect(json_response['status']).to eq(event.status)
        end
      end
    end

    context 'when params is invalid' do
      it 'returns not_found status' do
        get :show, params: { id: -1 }
        expect(json_response['status']).to eq('not_found')
      end
    end
  end

  describe 'POST #create' do
    context 'when user is organizer' do
      context 'when params is valid' do
        let(:valid_event) { build(:event) }

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

    context 'when user is attendee or unregistered' do
      it 'can\'t be enable' do
      end
    end
  end

  describe 'DELETE #destroy' do
    context 'when user is a creator of this event' do
      context 'when params is valid' do
        let(:valid_event) { create(:event) }

        it 'returns no_content status' do
          get :destroy, params: { id: valid_event.id }
          event = assigns(:event)
          expect(valid_event.name).to eq(event.name)
          expect(response).to have_http_status(:no_content)
        end
      end

      context 'when params is invalid' do
        it 'returns not_found status' do
          get :destroy, params: { id: -1 }
          expect(json_response['status']).to eq('not_found')
        end
      end
    end

    context 'when user isn\'t creator of this event' do
      it 'returns errors' do
      end
    end
  end

  describe 'PATCH #update' do
    context 'when user is organizer' do
      it 'returns json with params of updated event' do
      end
    end

    context 'when user is attendee or unregistered' do
      it 'can\'t be enable' do
      end
    end
  end
end
