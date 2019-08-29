require 'rails_helper'
# rubocop:disable Lint/AmbiguousBlockAssociation

RSpec.describe Api::V1::CommentsController, type: :controller do
  let(:user) { create(:user) }
  let(:organizer) { create(:user, role: :organizer) }
  let(:event) { create(:event, user_id: organizer.id) }
  let!(:attendance) { create(:attendance, event_id: event.id, user_id: user.id) }
  let!(:comment_by_user) { create(:comment, user_id: user.id, event_id: event.id) }
  let!(:comment_by_organizer) { create(:comment, user_id: organizer.id, event_id: event.id) }

  describe 'DELETE #destroy' do
    context 'when user add current comment' do
      before do
        @header = user.create_new_auth_token
        request.headers.merge!(@header)
      end

      it 'comment is deleted' do
        expect { delete :destroy, params: { id: comment_by_user.id, event_id: event.id } }
          .to change { Comment.all.count }.by(-1)
        expect(response).to have_http_status(:no_content)
      end

      it 'comment isn\'t found for delete' do
        expect { delete :destroy, params: { id: -1, event_id: event.id } }.to_not change { Comment.all.count }
        expect(response).to have_http_status(:not_found)
      end

      it 'comment isn\'t found for delete, comment belongs to another user' do
        expect { delete :destroy, params: { id: comment_by_organizer.id, event_id: event.id } }
          .to_not change { Comment.all.count }
        expect(response).to have_http_status(:not_found)
      end
    end

    context 'when user organizer of current event' do
      before do
        @header = organizer.create_new_auth_token
        request.headers.merge!(@header)
      end

      it 'comment is deleted' do
        expect { delete :destroy, params: { id: comment_by_organizer.id, event_id: event.id } }
          .to change { Comment.all.count }.by(-1)
        expect(response).to have_http_status(:no_content)
      end

      it 'comment isn\'t found for delete' do
        expect { delete :destroy, params: { id: -1, event_id: event.id } }.to_not change { Comment.all.count }
        expect(response).to have_http_status(:not_found)
      end

      it 'comment is deleted, comment belongs to another user' do
        expect { delete :destroy, params: { id: comment_by_user.id, event_id: event.id } }
          .to change { Comment.all.count }.by(-1)
        expect(response).to have_http_status(:no_content)
      end
    end

    context 'when no headres' do
      it 'returns message errors' do
        delete :destroy, params: { id: comment_by_user.id, event_id: event.id }
        @errors = [['errors', ['You need to sign in or sign up before continuing.']]]
        expect(response).to have_http_status(:unauthorized)
        expect(json_response.to_set).to eq(@errors.to_set)
      end
    end
  end
end
# rubocop:enable Lint/AmbiguousBlockAssociation
