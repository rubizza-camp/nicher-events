# :reek:InstanceVariableAssumption
# rubocop:disable Metrics/BlockLength
# rubocop:disable Metrics/ClassLength
class Api::V1::OrganizationsController < ApplicationController
  before_action :set_organization, only: %i[show update]
  before_action :authenticate_user!
  include Swagger::Blocks
  swagger_path 'api/v1/organizations/{id}' do
    operation :get do
      parameter do
        key :name, :id
        key :in, :path
        key :description, 'ID of organization to fetch'
        key :required, true
        key :type, :integer
        key :example, 1
      end
      key :description, 'Organization response'
      key :summary, 'Fetches organization by id'
      key :description, 'Checks whether user is organizer, and returns organization information'
      key :operationId, 'ShowOrganization'
      key :tags, ['organization']
      response 200 do
        schema do
          key :'$ref', :Organization
        end
      end
      response 401 do
        key :description, 'Current user hasn\'t signed in'
        schema do
          key :'$ref', :ErrorModel
        end
      end
      response 404 do
        key :description, 'Invalid id provided or user is attendee'
        schema do
          key :'$ref', :ErrorModel
        end
      end
    end
    operation :patch do
      parameter do
        key :name, :id
        key :in, :path
        key :description, 'ID of organization to update'
        key :required, true
        key :type, :integer
        key :example, 1
      end
      parameter do
        key :name, :organization
        key :in, :query
        key :description, 'New organization attributes'
        key :required, true
        schema do
          key :'$ref', :OrganizationInput
        end
      end
      key :description, 'Organization response'
      key :summary, 'Fetches organization by id'
      key :description, 'Checks, whether user can update organization information, and updates it'
      key :operationId, 'UpdateOrganization'
      key :tags, ['organization']
      response 200 do
        schema do
          key :'$ref', :Organization
        end
      end
      response 401 do
        key :description, 'Current user hasn\'t signed in'
        schema do
          key :'$ref', :ErrorModel
        end
      end
      response 403 do
        key :description, 'Current user has no access to this event'
        schema do
          key :'$ref', :ErrorModel
        end
      end
      response 422 do
        key :description, 'Invalid params for organization provided'
        schema do
          key :'$ref', :ErrorListModel
        end
      end
    end
  end

  def show
    if @organization && current_user.organization_member?(@organization.id)
      render json: @organization
    else
      head :not_found
    end
  end

  def update
    return head :forbidden unless current_user.organization_member?(@organization.id)

    if @organization.update(organization_params)
      render json: @organization
    else
      render json: @organization.errors.full_messages, status: :unprocessable_entity
    end
  end

  private

  def set_organization
    @organization = Organization.find_by(id: params[:id])
  end

  def organization_params
    params.require(:organization).permit(:name, :description)
  end
end
# rubocop:enable Metrics/BlockLength
# rubocop:enable Metrics/ClassLength
