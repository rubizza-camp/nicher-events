require 'rails_helper'

RSpec.describe Api::V1::AttendancesController, type: :controller do
  let(:organization) { create(:organization) }
  let(:organizer) { create(:user, role: :organizer, organization: organization) }
  let(:attendee) { create(:user, role: :attendee) }
  let(:second_organization) { create(:organization) }
  let(:second_organizer) { create(:user, role: :organizer, organization: second_organization) }

  describe 'POST #create' do
    let(:event) { create(:event, user_id: organizer.id) }

    context 'when user is unregistered' do
      it 'returns unauthorized status' do
        post :create, params: { event_id: event.id }
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context 'when event belongs to current organizer' do
      before do
        @header = organizer.create_new_auth_token
        request.headers.merge!(@header)
      end

      it 'returns forbidden status' do
        post :create, params: { event_id: event.id }
        expect(response).to have_http_status(:forbidden)
      end
    end

    context 'when event doesn\'t belong to current organizer' do
      before do
        @header = second_organizer.create_new_auth_token
        request.headers.merge!(@header)
      end

      it 'returns forbidden status' do
        post :create, params: { event_id: event.id }
        expect(response).to have_http_status(:created)
      end
    end

    context 'when attendee haven\'t already subscribed' do
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

    context 'when attendee have already subscribed' do
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

    context 'when event belongs to current organizer' do
      before do
        @header = organizer.create_new_auth_token
        request.headers.merge!(@header)
      end

      it 'returns forbidden status' do
        delete :destroy, params: { event_id: event.id }
        expect(response).to have_http_status(:forbidden)
      end
    end

    context 'when event doesn\'t belong to current organizer' do
      before do
        @header = second_organizer.create_new_auth_token
        request.headers.merge!(@header)
      end

      it 'returns no_content status' do
        Attendance.create({ event_id: event.id, user_id: second_organizer.id })
        delete :destroy, params: { event_id: event.id }
        expect(response).to have_http_status(:no_content)
      end
    end

    context 'when attendee haven\'t  already subscribed' do
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

    context 'when attendee have already subscribed' do
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
