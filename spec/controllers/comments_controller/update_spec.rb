require 'rails_helper'

RSpec.describe Api::V1::CommentsController, type: :controller do
  let!(:comment_attributes) { %w[id text rating created_at user event] }

  describe 'POST #create' do
    let(:user) { create(:user) }
    let(:organizer) { create(:user, role: :organizer) }
    let!(:attendance) { create(:attendance, event_id: event.id, user_id: user.id) }
    let(:event) { create(:event, user_id: organizer.id) }
    let!(:correct_comment) { create(:comment, user_id: user.id, event_id: event.id) }
    let!(:invalid_comment) { build(:comment, text: nil, rating: nil, user_id: user.id, event_id: event.id) }

    context 'when user add current comment and user update current comment' do
      before do
        @header = user.create_new_auth_token
        request.headers.merge!(@header)
      end

      it 'returns json with params of updated comment' do
        patch :update, params: { id: correct_comment.id, event_id: event.id, comment: correct_comment.attributes }
        expect(response).to have_http_status(:ok)
        expect(json_response.keys.to_set).to eq(comment_attributes.to_set)
        expect(json_response['text']).to eq(correct_comment.text)
      end

      it 'returns message errors' do
        patch :update, params: { id: correct_comment.id, event_id: event.id, comment: invalid_comment.attributes }
        expect(response).to have_http_status(:unprocessable_entity)
        @errors = ['Text can\'t be blank', 'Rating can\'t be blank']
        expect(json_response.to_set).to eq(@errors.to_set)
      end
    end

    context 'when user add current comment and organizer update current comment' do
      before do
        @header = organizer.create_new_auth_token
        request.headers.merge!(@header)
      end

      it 'returns message errors' do
        patch :update, params: { id: correct_comment.id, event_id: event.id, comment: correct_comment.attributes }
        expect(response).to have_http_status(:not_found)
      end
    end

    context 'when no headres' do
      it 'returns message errors' do
        patch :update, params: { id: correct_comment.id, event_id: event.id, comment: correct_comment.attributes }
        @errors = [['errors', ['You need to sign in or sign up before continuing.']]]
        expect(response).to have_http_status(:unauthorized)
        expect(json_response.to_set).to eq(@errors.to_set)
      end
    end
  end
end
