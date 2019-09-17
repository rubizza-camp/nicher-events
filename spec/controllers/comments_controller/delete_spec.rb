require 'rails_helper'
# rubocop:disable Lint/AmbiguousBlockAssociation

RSpec.describe Api::V1::CommentsController, type: :controller do
  let(:user) { create(:user) }
  let(:organizer) { create(:user, role: :organizer) }
  let(:event) { create(:event, user_id: organizer.id) }
  let!(:attendance) { create(:attendance, event_id: event.id, user_id: user.id) }
  let!(:comment_by_user) { create(:comment, user_id: user.id, event_id: event.id) }
  let!(:comment_by_organizer) { create(:comment, user_id: organizer.id, event_id: event.id) }
  let(:destroy_user_comment) { delete :destroy, params: { id: comment_by_user.id, event_id: event.id } }
  let(:destroy_invalid_comment) { delete :destroy, params: { id: -1, event_id: event.id } }
  let(:destroy_stranger_comment) { delete :destroy, params: { id: comment_by_organizer.id, event_id: event.id } }
  let(:destroy_organizer_comment) { delete :destroy, params: { id: comment_by_organizer.id, event_id: event.id } }
  describe 'DELETE #destroy' do
    context 'when user adds current comment' do
      before do
        @header = user.create_new_auth_token
        request.headers.merge!(@header)
      end

      it 'can be deleted' do
        expect destroy_user_comment
          .to change { Comment.count }.by(-1)
        expect(response).to have_http_status(:no_content)
      end

      it 'can\'t delete by invalid id' do
        expect destroy_invalid_comment.to_not change { Comment.count }
        expect(response).to have_http_status(:forbidden)
      end

      it 'can\'t delete comment of other user' do
        expect destroy_stranger_comment
          .to_not change { Comment.count }
        expect(response).to have_http_status(:forbidden)
      end
    end

    context 'when user is organizer of current event' do
      before do
        @header = organizer.create_new_auth_token
        request.headers.merge!(@header)
      end

      it 'can be deleted' do
        expect destroy_organizer_comment
          .to change { Comment.all.count }.by(-1)
        expect(response).to have_http_status(:no_content)
      end

      it 'can\'t delete by invalid id' do
        expect destroy_invalid_comment
        expect(response).to have_http_status(:forbidden)
      end

      it 'can delete comment of other user' do
        expect destroy_user_comment
          .to change { Comment.all.count }.by(-1)
        expect(response).to have_http_status(:no_content)
      end
    end

    context 'when no headers' do
      it 'returns message errors' do
        destroy_user_comment
        @errors = [['errors', ['You need to sign in or sign up before continuing.']]]
        expect(response).to have_http_status(:unauthorized)
        expect(json_response.to_set).to eq(@errors.to_set)
      end
    end
  end
end
# rubocop:enable Lint/AmbiguousBlockAssociation
