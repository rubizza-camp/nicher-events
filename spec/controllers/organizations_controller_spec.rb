require 'rails_helper'

RSpec.describe Api::V1::OrganizationsController, type: :controller do
  let(:organization_attributes) { %w[id name description users] }

  describe 'GET #index' do
    let(:organizations) { create_list(:organization, 4) }

    context 'when user authorized' do
      let(:user) { create(:user, role: 'organizer') }

      before do
        @header = user.create_new_auth_token
        request.headers.merge!(@header)
      end

      it 'shows a list of organizations' do
        user.organization = organizations.first
        get :index
        expect(json_response.first.keys).to eq(organization_attributes)
        expect(json_response.first['name']).to eq(organizations.first['name'])
        expect(json_response.first['description']).to eq(organizations.first['description'])
      end
    end

    context 'user unauthorized' do
      let(:user) { create(:user, role: 'attendee') }

      before do
        @header = user.create_new_auth_token
        request.headers.merge!(@header)
      end

      it 'returns error' do
        get :index
        expect(response).to have_http_status(401)
      end
    end
  end

  describe 'GET #show' do
    let(:user) { create(:user, role: 'organizer') }
    let(:organization) { create(:organization) }

    context 'when user is authorized' do
      before do
        @header = user.create_new_auth_token
        request.headers.merge!(@header)
      end

      context 'when valid params' do
        it 'returns json response with organization' do
          get :show, params: { id: organization.id }
          expect(json_response.keys).to eq(organization_attributes)
          expect(json_response['name']).to eq(organization.name)
          expect(json_response['description']).to eq(organization.description)
        end

        it 'returns 200 status' do
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
    end

    context 'when user is unauthorized' do
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

  describe 'POST #create' do
    context 'when user authorized' do
      let(:user) { create(:user, role: 'organizer') }
      let(:valid_params) { build(:organization) }

      before do
        @header = user.create_new_auth_token
        request.headers.merge(@header)
      end

      context 'while valid' do
        it 'creates new organization' do
          post :create, params: { organization: valid_params.attributes }
          expect(json_response['name']).to eq(valid_params['name'])
          expect(json_response['description']).to eq(valid_params['description'])
        end
      end

      let(:invalid_params) { { name: nil, description: 'AAAA' } }

      context 'while invalid' do
        it 'returns error' do
          post :create, params: { organization: invalid_params }
          expect(json_response.first).to eq('Name can\'t be blank')
          expect(json_response[1]).to eq('Name is too short (minimum is 2 characters)')
        end
      end

      context 'when user already has organization' do
        let(:organization) { create(:organization) }

        it 'return 422 error' do
          user.organization = organization
          post :create, params: { organization: valid_params.attributes }
          expect(response).to have_http_status(422)
        end
      end
    end

    context 'when user unauthorized' do
      let(:user) { create(:user, role: 'attendee') }
      let(:organization) { build(:organization) }

      before do
        @header = user.create_new_auth_token
        request.headers.merge(@header)
      end

      it 'return 401 error' do
        post :create, params: { organization: organization.attributes }
        expect(response).to have_http_status(401)
      end
    end
  end

  describe 'PATCH #update' do
    let!(:organization) { create(:organization) }

    context 'when user is authorized' do
      let(:user) { create(:user, role: 'organizer') }

      before do
        @header = user.create_new_auth_token
        request.headers.merge(@header)
      end

      it 'returns 200 status' do
        user.organization = organization
        new_attributes = { name: 'AAAA', description: 'AAAAAAAAAAAAAA' }
        patch :update, params: { id: user.organization.id, organization: new_attributes }
        organization.reload
        expect(response).to have_http_status(200)
      end

      context 'when invalid params' do
        it 'returns 422 error' do
          user.organization = organization
          new_attributes = { name: '', description: '' }
          patch :update, params: { id: user.organization.id, organization: new_attributes }
          organization.reload
          expect(response).to have_http_status(422)
        end
      end
    end

    context 'when user is unauthorized' do
      let(:user) { create(:user, role: 'attendee') }

      before do
        @header = user.create_new_auth_token
        request.headers.merge(@header)
      end

      it 'returns 401 error' do
        new_attributes = { name: 'AAAA', description: 'AAAAAAAAAAAAAA' }
        patch :update, params: { id: organization.id, organization: new_attributes }
        expect(response).to have_http_status(401)
      end
    end
  end
end
