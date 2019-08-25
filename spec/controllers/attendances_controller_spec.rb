require 'rails_helper'

RSpec.describe Api::V1::AttendancesController, type: :controller do
  let(:organization) { create(:organization) }
  let(:organizer) { create(:user, role: :organizer, organization: organization) }
  let(:attendee) { create(:user, role: :attendee) }

  describe 'POST #create' do
    let(:event) { create(:event, user_id: organizer.id) }

    context 'when user is unregistered' do
      it 'returns unauthorized status' do
        post :create, params: { event_id: event.id }
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context 'when user is organizer' do
      before do
        @header = organizer.create_new_auth_token
        request.headers.merge!(@header)
      end

      it 'returns forbidden status' do
        post :create, params: { event_id: event.id }
        expect(response).to have_http_status(:forbidden)
      end
    end

    context 'when attendee does\'t subscribe' do
      before do
        @header = attendee.create_new_auth_token
        request.headers.merge!(@header)
      end

      let(:new_event) { create(:event, user_id: organizer.id) }

      it 'returns created status' do
        post :create, params: { event_id: new_event.id }
        expect(response).to have_http_status(:created)
      end
    end

    context 'when attendee already subscribe' do
      before do
        @header = attendee.create_new_auth_token
        request.headers.merge!(@header)
      end

      let(:new_event) { create(:event, user_id: organizer.id) }

      it 'returns unprocessable_entity status' do
        Attendance.create({ event_id: new_event.id, user_id: attendee.id })
        post :create, params: { event_id: new_event.id }
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe 'DELETE #destroy' do
    let(:event) { create(:event, user_id: organizer.id) }

    context 'when user is unregistered' do
      it 'returns unauthorized status' do
        delete :destroy, params: { event_id: event.id }
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context 'when user is organizer' do
      before do
        @header = organizer.create_new_auth_token
        request.headers.merge!(@header)
      end

      it 'returns forbidden status' do
        delete :destroy, params: { event_id: event.id }
        expect(response).to have_http_status(:forbidden)
      end
    end

    context 'when attendee doesn\'t subscribe' do
      before do
        @header = attendee.create_new_auth_token
        request.headers.merge!(@header)
      end

      let(:new_event) { create(:event, user_id: organizer.id) }

      it 'returns unprocessable_entity status' do
        delete :destroy, params: { event_id: new_event.id }
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end

    context 'when attendee already subscribe' do
      before do
        @header = attendee.create_new_auth_token
        request.headers.merge!(@header)
      end

      let(:new_event) { create(:event, user_id: organizer.id) }

      it 'returns no_content status' do
        Attendance.create({ event_id: new_event.id, user_id: attendee.id })
        delete :destroy, params: { event_id: new_event.id }
        expect(response).to have_http_status(:no_content)
      end
    end
  end
end
