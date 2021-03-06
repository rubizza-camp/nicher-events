require 'rails_helper'
# rubocop:disable Lint/AmbiguousBlockAssociation

RSpec.describe Api::V1::EventsController, type: :controller do
  let(:current_organization) { create(:organization) }
  let(:first_organizer) { create(:user, role: :organizer, organization: current_organization) }
  let(:second_organizer) { create(:user, role: :organizer, organization: current_organization) }
  let(:organization) { create(:organization) }
  let(:third_organizer) { create(:user, role: :organizer, organization: organization) }
  let!(:event_of_current_organization) { create(:event, user_id: first_organizer.id) }
  let(:destroy_action) { delete :destroy, params: event_params }

  describe 'DELETE #destroy' do
    context 'when user is organizer of current event\'s organization' do
      before do
        @header = second_organizer.create_new_auth_token
        request.headers.merge!(@header)
      end

      context 'event took place in past' do
        let(:date) { Faker::Date.between(from: 2.days.ago, to: Date.today) }
        let!(:past_event) { create(:event, user_id: first_organizer.id, date: date) }
        let(:event_params) { { id: past_event.id } }

        it 'doesn\'t delete event and returns unprocessable_entity status' do
          expect { destroy_action }.to_not change { Event.all.count }
          expect(response).to have_http_status(:unprocessable_entity)
        end
      end

      context 'event will take place in future' do
        let(:date) { Faker::Date.between(from: 1.days.from_now, to: 2.days.from_now) }
        let!(:future_event) { create(:event, user_id: first_organizer.id, date: date) }
        let(:event_params) { { id: future_event.id } }

        it 'future event is deleted' do
          expect { destroy_action }.to change { Event.all.count }.by(-1)
          expect(response).to have_http_status(:no_content)
        end
      end

      context 'when event doesn\'t exist' do
        let(:event_params) { { id: -1 } }

        it 'event isn\'t found for delete' do
          expect { destroy_action }.to_not change { Event.all.count }
          expect(response).to have_http_status(:not_found)
        end
      end
    end

    context 'when user isn\'t organizer of current event\'s organization' do
      before do
        @header = third_organizer.create_new_auth_token
        request.headers.merge!(@header)
      end

      let(:event_params) { { id: event_of_current_organization.id } }

      it 'event isn\'t delete with forbidden status' do
        expect { destroy_action }.to_not change { Event.all.count }
        expect(response).to have_http_status(:forbidden)
      end
    end

    context 'when user is attendee' do
      before do
        @user = create(:user)
        @header = @user.create_new_auth_token
        request.headers.merge!(@header)
      end

      let(:event_params) { { id: event_of_current_organization.id } }

      it 'event isn\'t delete with forbidden status' do
        expect { destroy_action }.to_not change { Event.all.count }
        expect(response).to have_http_status(:forbidden)
      end
    end

    context 'when user is unregistered' do
      let(:event_params) { { id: event_of_current_organization.id } }

      it 'event isn\'t delete with unauthorized status' do
        expect { destroy_action }.to_not change { Event.all.count }
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end
end
# rubocop:enable Lint/AmbiguousBlockAssociation
