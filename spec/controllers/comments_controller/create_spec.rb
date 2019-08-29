require 'rails_helper'

RSpec.describe Api::V1::CommentsController, type: :controller do
  let!(:comment_attributes) { %w[id text rating created_at user event] }

  describe 'POST #create' do
    let(:user) { create(:user) }
    let(:organizer) { create(:user, role: :organizer) }
    let(:event) { create(:event, user_id: organizer.id) }
    let!(:attendance) { create(:attendance, event_id: event.id, user_id: user.id) }
    let(:correct_comment) { build(:comment, event_id: event.id) }
    let(:invalid_comment) { build(:comment, text: nil, rating: nil, event_id: event.id) }

    context 'when params is valid' do
      before do
        @header = user.create_new_auth_token
        request.headers.merge!(@header)
      end

      it 'returns json with params of created comment' do
        post :create, params: { comment: correct_comment.attributes, event_id: event.id }
        expect(response).to have_http_status(:created)
        expect(json_response.keys.to_set).to eq(comment_attributes.to_set)
        expect(json_response['text']).to eq(correct_comment.text)
      end
    end

    context 'when params is invalid' do
      before do
        @header = user.create_new_auth_token
        request.headers.merge!(@header)
      end

      it 'returns message errors' do
        post :create, params: { comment: invalid_comment.attributes, event_id: event.id }
        @errors = ['Text can\'t be blank', 'Rating can\'t be blank']
        expect(response).to have_http_status(:unprocessable_entity)
        expect(json_response.to_set).to eq(@errors.to_set)
      end
    end

    context 'when no headres' do
      it 'returns message errors' do
        post :create, params: { comment: correct_comment.attributes, event_id: event.id }
        @errors = [['errors', ['You need to sign in or sign up before continuing.']]]
        expect(response).to have_http_status(:unauthorized)
        expect(json_response.to_set).to eq(@errors.to_set)
      end
    end
  end
end
