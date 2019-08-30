# :reek:InstanceVariableAssumption :reek:NilCheck
class Api::V1::EventLayoutsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_event_layout

  def show
    render json: @event_layout
  end

  private

  def set_event_layout
    @event_layout = EventLayout.find_by(id: params[:id])
    head :not_found unless @event_layout
  end
end
