# :reek:InstanceVariableAssumption
# :reek:NilCheck

class Api::V1::AttendancesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_event
  before_action :verify_role_user

  def create
    return head :unprocessable_entity if @event.already_subscribed_by_user?(current_user.id)

    @attendance = current_user.attendances.new(attendance_params)
    return head :unprocessable_entity unless @attendance.save

    head :created
  end

  def destroy
    return head :unprocessable_entity unless @event.already_subscribed_by_user?(current_user.id)

    @attendance = current_user.attendances.find_by(event_id: params[:event_id])
    @attendance.destroy
    head :no_content
  end

  private

  def set_event
    @event = Event.find_by(id: params[:event_id]).decorate
  end

  def attendance_params
    params.permit(:event_id)
  end

  def verify_role_user
    return head :unprocessable_entity if @event.editable?(current_user.id)
  end
end
