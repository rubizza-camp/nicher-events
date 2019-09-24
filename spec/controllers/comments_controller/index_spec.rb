require 'rails_helper'

RSpec.describe Api::V1::CommentsController, type: :controller do
  let!(:comment_attributes) { %w[id text rating created_at user event] }

  describe 'GET #index' do
    let(:user) { create(:user) }
    let(:organizer) { create(:user, role: :organizer) }
    let(:event) { create(:event, user_id: organizer.id) }
    let!(:comment) { create(:comment, user_id: user.id, event_id: event.id) }

    context 'when params are valid' do
      before do
        @header = user.create_new_auth_token
        request.headers.merge!(@header)
      end

      it 'returns json with params of comments' do
        get :index, params: { event_id: event.id }
        expect(response).to have_http_status(:ok)
        expect(json_response.length).to eq(event.comments.size)
      end
    end

    context 'when params are invalid' do
      before do
        @header = user.create_new_auth_token
        request.headers.merge!(@header)
      end

      it 'returns message with errors' do
        get :index, params: { event_id: -1 }
        expect(response).to have_http_status(:not_found)
      end
    end

    context 'when no headers' do
      it 'returns json with params of comments' do
        get :index, params: { event_id: event.id }
        expect(response).to have_http_status(:ok)
        expect(json_response.length).to eq(event.comments.size)
      end
    end
  end
end
