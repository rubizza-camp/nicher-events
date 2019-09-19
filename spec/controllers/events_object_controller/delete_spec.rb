require 'rails_helper'

RSpec.describe Api::V1::EventObjectsController, type: :controller do
  let(:organization) { create(:organization) }
  let(:organizer) { create(:user, role: :organizer, organization: organization) }


  describe 'DELETE #destroy' do
    let!(:event_object) { create(:event_object) }
    let(:destroy_action) { delete :destroy, params: event_object_params }
    let(:event_object_params) { { id: event_object.id } }
    context 'when user is organizer' do
      before do
        @header = organizer.create_new_auth_token
        request.headers.merge!(@header)
      end
      it 'delete event object' do
        expect { destroy_action }.to change { EventObject.all.count }.by(-1).and change { ActiveStorage::Attachment.count }.by(-1)
        expect(response).to have_http_status(:success)
      end
    end

    context 'when user is attendee' do
      let(:attendee) { create(:user, role: :attendee) }

      before do
        @header = attendee.create_new_auth_token
        request.headers.merge!(@header)
      end

      it 'event object isn\'t delete with forbidden status' do
        expect { destroy_action }.to_not change { EventObject.all.count }
        expect { destroy_action }.to_not change { ActiveStorage::Attachment.count }
        expect(response).to have_http_status(:forbidden)
      end
    end

    context 'when user is unregistered' do

      it 'event isn\'t delete with unauthorized status' do
        expect { destroy_action }.to_not change { EventObject.all.count }
        expect { destroy_action }.to_not change { ActiveStorage::Attachment.count }
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end
end
