require 'rails_helper'

RSpec.describe Api::OrganizationsController, type: :controller do
  describe 'GET #show' do
    let(:organization_attributes) { %w[id name description] }
    context 'when valid' do
      let(:organization) { create(:organization) }
      it 'returns json response with organization' do
        get :show, params: { id: organization.id }
        json_response = JSON.parse(response.body)

        expect(json_response.keys).to eq(organization_attributes)
      end
    end

    context 'when invalid' do
      it 'should return error status' do
        get :show, params: { id: 0 }
        json_response = JSON.parse(response.body)

        expect(json_response['status']).to eq('unprocessable_entity')
      end
    end
  end

  describe 'GET #destroy' do
    let!(:organization) { create(:organization) }
    it 'descrease count of organizations in db by 1' do
      expect { get :destroy, params: { id: organization.id } }.to change { Organization.all.count }.by(-1)
    end
  end

  describe 'POST #create' do
    let(:input_valid_params) { { name: 'AAA', description: 'AAAAAAAAA' } }
    context 'while valid' do
      it 'should create new organization' do
        post :create, params: { organization: input_valid_params }
        organization = assigns(:organization)

        expect(organization.name).to eq input_valid_params[:name]
      end
    end

    let(:input_invalid_params) { { name: nil, description: 'AAAA' } }
    context 'while invalid' do
      it 'should return error' do
        post :create, params: { organization: input_invalid_params }
        organization = assigns(:organization)

        expect(organization.errors.messages[:name].first).to eq('can\'t be blank')
      end
    end
  end

  describe 'PATCH #update' do
    let!(:organization) { create(:organization) }
    context 'while valid' do
      it 'should update organization info' do
        new_attributes = { name: 'AAAA', description: 'AAAAAAAAAAAAAA' }
        put :update, params: { id: organization.id, organization: new_attributes }
        organization.reload
        new_attributes.keys.each do |key|
          expect(organization.attributes[key.to_s]).to eq new_attributes[key]
        end
      end
    end
  end
end
