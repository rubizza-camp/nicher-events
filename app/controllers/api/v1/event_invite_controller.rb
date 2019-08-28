# :reek:InstanceVariableAssumption
# :reek:MissingSafeMethod

class Api::V1::EventInviteController < ApplicationController
  before_action :authenticate_user!
  before_action :verify_organizer!

  def create
    @invite = current_user.event_invite.new(attendance_params)
    return head :unprocessable_entity unless @invite.save

    head :created
  end

  private

  def verify_organizer!
    return head :forbidden unless current_user.organizer?
  end

  def attendance_params
    params.require(:event_invite).permit(:email).merge(event_id: params[:event_id])
  end
end
