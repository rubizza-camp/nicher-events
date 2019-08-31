require 'rails_helper'

RSpec.describe Api::V1::UserOrganizationsController, type: :controller do
  describe 'DELETE #destroy' do
    let!(:organization) { create(:organization) }

    context 'when user is authorized' do
      let(:owner) { create(:user, role: 'organizer', organization: organization) }
      let(:user) { create(:user, role: 'organizer') }
      before do
        @header = owner.create_new_auth_token
        request.headers.merge(@header)
        organization.owner_id = owner.id
      end

      context 'when user isn\'t organization owner' do
        it 'returns no_content status' do
          organization.users << user
          delete :destroy, params: { id: user.user_organization.id, organization_id: organization.id }
          expect(response).to have_http_status(:no_content)
        end
      end

      context 'when user is organization owner' do
        it 'returns forbidden status' do
          delete :destroy, params: { id: owner.user_organization.id, organization_id: organization.id }
          expect(response).to have_http_status(:forbidden)
        end
      end
    end
  end

  describe 'GET #index' do
    let!(:organization) { create(:organization) }

    context 'when user is authorized' do
      let(:owner) { create(:user, role: 'organizer', organization: organization) }
      let(:user) { create(:user, role: 'organizer') }
      before do
        @header = owner.create_new_auth_token
        request.headers.merge(@header)
        organization.owner_id = owner.id
      end

      it 'returns users' do
        get :index, params: { organization_id: organization.id }
        expect(json_response.count).to eq(organization.users.count)
      end
    end
  end
end
