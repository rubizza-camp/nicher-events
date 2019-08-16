require 'rails_helper'

RSpec.describe Api::V1::EventsController, type: :controller do
  let(:organizer) { create(:user, role: :organizer) }
  let(:event_of_current_user) { create(:event, user_id: organizer.id) }

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
      it 'returns unauthorized status' do
        post :create, params: { event: event_of_current_user.attributes }
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end
end
