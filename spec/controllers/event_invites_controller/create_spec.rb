require 'rails_helper'
# rubocop:disable Lint/AmbiguousBlockAssociation

RSpec.describe Api::V1::EventInvitesController, type: :controller do
  let(:organization) { create(:organization) }
  let(:organizer) { create(:user, role: :organizer, organization: organization) }
  let(:event) { create(:event, user_id: organizer.id) }
  let(:attendee) { create(:user, role: :attendee) }
  let(:second_organization) { create(:organization) }
  let(:second_organizer) { create(:user, role: :organizer, organization: second_organization) }

  describe 'POST #create' do
    let(:create_action) { post :create, params: invite_params }

    context 'when user is unregistered' do
      let(:invite_params) { build(:event_invite, user_id: organizer.id, event_id: event.id).attributes }

      it 'doesn\'t create invite and returns unauthorized status' do
        expect { create_action }.to_not change { EventInvite.all.count }
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context 'when user is attendee' do
      before do
        @header = attendee.create_new_auth_token
        request.headers.merge!(@header)
      end

      let(:invite_params) { build(:event_invite, user_id: attendee.id, event_id: event.id).attributes }

      it 'doesn\'t create invite and returns forbidden status' do
        expect { create_action }.to_not change { EventInvite.all.count }
        expect(response).to have_http_status(:forbidden)
      end
    end

    context 'event doesn\'t belong to current user\'s organization' do
      before do
        @header = second_organizer.create_new_auth_token
        request.headers.merge!(@header)
      end

      let(:invite_params) { build(:event_invite, user_id: second_organizer.id, event_id: event.id).attributes }

      it 'doesn\'t create invite and returns forbidden status' do
        expect { create_action }.to_not change { EventInvite.all.count }
        expect(response).to have_http_status(:forbidden)
      end
    end

    context 'event belongs to current user\'s organization' do
      before do
        @header = organizer.create_new_auth_token
        request.headers.merge!(@header)
      end

      context 'user with this email has already subscribe to this event' do
        let(:user) { create(:user) }
        let!(:attendance) { create(:attendance, event_id: event.id, user_id: user.id) }
        let(:invite_params) { { event_invite: { email: user.email }, event_id: event.id } }

        it 'doesn\'t create invite and returns already_reported status' do
          expect { create_action }.to_not change { EventInvite.all.count }
          expect(response).to have_http_status(:unprocessable_entity)
        end
      end

      context 'when invalid params' do
        let(:invite_params) { { event_invite: { email: nil }, event_id: event.id } }

        it 'doesn\'t create invite and returns unprocessable_entity status' do
          expect { create_action }.to_not change { EventInvite.all.count }
          expect(response).to have_http_status(:unprocessable_entity)
        end
      end

      context 'when valid params' do
        let(:user) { create(:user) }
        let(:invite_params) { { event_invite: { email: user.email }, event_id: event.id } }

        it 'create invite' do
          expect { create_action }.to change { EventInvite.all.count }.by(1)
          expect(response).to have_http_status(:created)
        end
      end
    end
  end
end
# rubocop:enable Lint/AmbiguousBlockAssociation
