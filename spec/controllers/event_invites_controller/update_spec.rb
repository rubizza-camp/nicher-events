require 'rails_helper'
# rubocop:disable Metrics/LineLength

RSpec.describe Api::V1::EventInvitesController, type: :controller do
  let(:organization) { create(:organization) }
  let(:organizer) { create(:user, role: :organizer, organization: organization) }
  let(:event) { create(:event, user_id: organizer.id) }
  let(:user) { build(:user, role: :attendee) }
  let(:invite) { create(:event_invite, user_id: organizer.id, event_id: event.id, email: user.email) }
  let(:invalid_token) { Faker::String.random }
  let(:attendee) { create(:user, role: :attendee) }

  describe 'PATCH #update' do
    let(:update_action) { patch :update, params: invite.attributes }

    context 'user has already authenticated' do
      before do
        @header = attendee.create_new_auth_token
        request.headers.merge!(@header)
      end

      context 'when invite was rejected' do
        it 'updates decline_at and remove token in db' do
          patch :update, params: { id: invite.id, event_id: invite.event_id, status: 'reject', token: invite.token, event_invite: { email: user.email } }
          @invite = assigns(:invite)
          expect(@invite.decline_at).to be_truthy
          expect(@invite.token).to be_nil
        end
      end

      context 'when token is invalid' do
        it 'doesn\'t update invite and returns precondition_failed status' do
          patch :update, params: { id: invite.id, event_id: invite.event_id, status: 'reject', token: invalid_token }
          expect(response).to have_http_status(:precondition_failed)
        end
      end

      context 'when invite was accepted' do
        let(:invite_params) { { id: invite.id, event_id: invite.event_id, status: 'accept', token: invite.token } }

        it 'updates accept_at and removes token in db' do
          patch :update, params: { id: invite.id, event_id: invite.event_id, status: 'accept', token: invite.token }
          @invite = EventInvite.find(invite.id)
          expect(@invite.accept_at).to be_truthy
          expect(@invite.token).to be_nil
        end
      end
    end

    context 'user is unregistered' do
      let(:invite_params) { { id: invite.id, event_id: invite.event_id, status: 'accept', token: invite.token } }

      it 'doesn\'t update invite and returns unauthorized status' do
        patch :update, params: invite_params
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end
end
# rubocop:enable Metrics/LineLength
