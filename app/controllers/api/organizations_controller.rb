class Api::OrganizationsController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :set_organization, only: [:show, :edit, :update, :destroy]

  def index
    @organizations = Organization.all
    render json: @organizations
  end

  def show
    render json: @organization
  end

  def create
    @organization = Organization.new(organization_params)
    if @organization.save
      render json: @organization, status: :created
    else
      render json: @organization.errors, status: :unprocessable_entity
    end
  end

  def edit; end

  def update
    if @organization.update(organization_params)
      render json: @organization, status: :ok
    else
      render json: @organization.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @organization.destroy
    head :no_content
  end

  private
    def set_organization
      @organization = Organization.find(params[:id])
    end

    def organization_params
      params.require(:organization).permit(:name, :description)
    end
end
