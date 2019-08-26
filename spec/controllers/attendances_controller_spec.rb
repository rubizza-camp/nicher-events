require 'rails_helper'
# rubocop:disable Lint/AmbiguousBlockAssociation

RSpec.describe Api::V1::AttendancesController, type: :controller do
  let(:organization) { create(:organization) }
  let(:organizer) { create(:user, role: :organizer, organization: organization) }
  let(:attendee) { create(:user, role: :attendee) }
  let(:second_organization) { create(:organization) }
  let(:second_organizer) { create(:user, role: :organizer, organization: second_organization) }

  describe 'POST #create' do
    let!(:event) { create(:event, user_id: organizer.id) }
    let(:create_action) { post :create, params: attendance_params }
    let(:attendance_params) { { event_id: event.id } }

    context 'when user is unregistered' do
      it 'returns unauthorized status' do
        expect { create_action }.to_not change { Attendance.all.count }
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context 'when event belongs to current organizer' do
      before do
        @header = organizer.create_new_auth_token
        request.headers.merge!(@header)
      end

      it 'returns forbidden status' do
        expect { create_action }.to_not change { Attendance.all.count }
        expect(response).to have_http_status(:forbidden)
      end
    end

    context 'when event doesn\'t belong to current organizer' do
      before do
        @header = second_organizer.create_new_auth_token
        request.headers.merge!(@header)
      end

      it 'returns created status' do
        expect { create_action }.to change { Attendance.all.count }.by(1)
        expect(response).to have_http_status(:created)
      end
    end

    context 'when attendee haven\'t already subscribed' do
      before do
        @header = attendee.create_new_auth_token
        request.headers.merge!(@header)
      end

      let!(:new_event) { create(:event, user_id: organizer.id) }
      let(:attendance_params) { { event_id: new_event.id } }

      it 'returns created status' do
        expect { create_action }.to change { Attendance.all.count }.by(1)
        expect(response).to have_http_status(:created)
      end
    end

    context 'when attendee have already subscribed' do
      before do
        @header = attendee.create_new_auth_token
        request.headers.merge!(@header)
      end

      let(:new_event) { create(:event, user_id: organizer.id) }
      let!(:attendance) { create(:attendance, event_id: new_event.id, user_id: attendee.id) }
      let(:attendance_params) { { event_id: new_event.id } }
      it 'returns unprocessable_entity status' do
        expect { create_action }.to_not change { Attendance.all.count }
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe 'DELETE #destroy' do
    let(:destroy_action) { delete :destroy, params: attendance_params }
    let(:event) { create(:event, user_id: organizer.id) }
    let!(:attendance) { create(:attendance, event_id: event.id, user_id: organizer.id) }
    let(:attendance_params) { { event_id: event.id, id: attendance.id } }

    context 'when user is unregistered' do
      it 'returns unauthorized status' do
        expect { destroy_action }.to_not change { Attendance.all.count }
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context 'when event belongs to current organizer' do
      before do
        @header = organizer.create_new_auth_token
        request.headers.merge!(@header)
      end

      it 'returns forbidden status' do
        expect { destroy_action }.to_not change { Attendance.all.count }
        expect(response).to have_http_status(:forbidden)
      end
    end

    context 'when event doesn\'t belong to current organizer' do
      before do
        @header = second_organizer.create_new_auth_token
        request.headers.merge!(@header)
      end

      let!(:second_attendance) { create(:attendance, event_id: event.id, user_id: second_organizer.id) }
      let(:attendance_params) { { event_id: event.id, id: second_attendance.id } }

      it 'returns no_content status' do
        expect { destroy_action }.to change { Attendance.all.count }.by(-1)
        expect(response).to have_http_status(:no_content)
      end
    end

    context 'when attendee haven\'t  already subscribed' do
      before do
        @header = attendee.create_new_auth_token
        request.headers.merge!(@header)
      end

      let!(:new_event) { create(:event, user_id: organizer.id) }
      let!(:second_attendance) { create(:attendance, event_id: event.id, user_id: second_organizer.id) }
      let!(:attendance_params) { { event_id: new_event.id, id: second_attendance.id } }

      it 'returns unprocessable_entity status' do
        expect { destroy_action }.to_not change { Attendance.all.count }
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end

    context 'when attendee have already subscribed' do
      before do
        @header = attendee.create_new_auth_token
        request.headers.merge!(@header)
      end

      let!(:new_event) { create(:event, user_id: organizer.id) }
      let!(:new_attendance) { create(:attendance, event_id: new_event.id, user_id: attendee.id) }
      let!(:attendance_params) { { event_id: new_event.id, id: new_attendance.id } }

      it 'returns no_content status' do
        expect { destroy_action }.to change { Attendance.all.count }.by(-1)
        expect(response).to have_http_status(:no_content)
      end
    end
  end
end
# rubocop:enable Lint/AmbiguousBlockAssociation
