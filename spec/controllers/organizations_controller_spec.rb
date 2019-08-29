require 'rails_helper'

RSpec.describe Api::V1::OrganizationsController, type: :controller do
  let(:organization_attributes) { %w[id name description owner_id events] }

  describe 'GET #show' do
    let(:user) { create(:user, role: 'organizer').decorate }
    let(:organization) { create(:organization) }

    context 'when user is authorized' do
      before do
        @header = user.create_new_auth_token
        request.headers.merge!(@header)
      end

      context 'when valid params' do
        it 'returns json response with organization' do
          user.organization = organization
          get :show, params: { id: organization.id }
          expect(json_response.keys).to eq(organization_attributes)
          expect(json_response['name']).to eq(organization.name)
          expect(json_response['description']).to eq(organization.description)
        end

        it 'returns 200 status' do
          user.organization = organization
          get :show, params: { id: organization.id }
          expect(response).to have_http_status(200)
        end
      end

      context 'when invalid params' do
        it 'returns error status' do
          get :show, params: { id: 0 }
          expect(response).to have_http_status(:not_found)
        end
      end

      context 'when user has role attendee' do
        let(:user) { create(:user, role: 'attendee') }

        before do
          @header = user.create_new_auth_token
          request.headers.merge!(@header)
        end

        it 'returns not_found status' do
          get :show, params: { id: organization.id }
          expect(response).to have_http_status(404)
        end
      end
    end

    context 'when user is unauthorized' do
      let(:user) { build(:user, role: 'attendee') }

      it 'returns unauthorized status' do
        get :show, params: { id: organization.id }
        expect(response).to have_http_status(401)
      end
    end
  end

  describe 'PATCH #update' do
    let!(:organization) { create(:organization) }

    context 'when user is authorized' do
      let(:user) { create(:user, role: 'organizer').decorate }
      let(:new_organization) { build(:organization) }
      before do
        @header = user.create_new_auth_token
        request.headers.merge(@header)
      end

      it 'returns 200 status' do
        user.organization = organization
        patch :update, params: { id: user.organization.id, organization: new_organization.attributes }
        expect(response).to have_http_status(200)
      end

      context 'when invalid params' do
        it 'returns 422 error' do
          user.organization = organization
          new_attributes = { name: '', description: '' }
          patch :update, params: { id: user.organization.id, organization: new_attributes }
          expect(response).to have_http_status(422)
        end
      end
    end

    context 'when user is unauthorized' do
      let(:user) { create(:user, role: 'attendee') }
      let(:new_organization) { build(:organization) }

      before do
        @header = user.create_new_auth_token
        request.headers.merge(@header)
      end

      it 'returns 403 error' do
        patch :update, params: { id: organization.id, organization: new_organization.attributes }
        expect(response).to have_http_status(403)
      end
    end
  end
end
