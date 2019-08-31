# :reek:InstanceVariableAssumption
# :reek:MissingSafeMethod
# :reek:NilCheck

class Api::V1::EventInvitesController < ApplicationController
  before_action :authenticate_user!, only: %i[create show update]
  before_action :verify_organizer!, only: %i[create]
  before_action :set_event, only: %i[create]
  before_action :verify_email!, only: %i[create]
  before_action :generate_token, only: %i[create]
  before_action :set_invite, only: %i[show update]
  before_action :verify_token!, only: %i[show update]

  def create
    @invite = current_user.event_invites.new(attendance_params)
    return head :unprocessable_entity unless @invite.save

    send_invite
    head :created
  end

  def show
    render json: @invite
  end

  def update
    return :unprocessable_entity unless current_user&.email != params.dig(:event_invite, :email)

    update_as_decline if params[:status] == 'reject'
    update_as_accept if params[:status] == 'accept'
  end

  def update_as_decline
    @invite.update(decline_at: Time.zone.now, token: nil)
  end

  def update_as_accept
    @invite.update(accept_at: Time.zone.now, token: nil)
  end

  private

  def verify_organizer!
    return head :forbidden unless current_user.current_event_organizer?(params[:event_id])
  end

  def verify_email!
    @user = User.find_by(email: params.dig(:event_invite, :email))
    return head :unprocessable_entity if @user && @event.already_subscribed_by_user?(@user.id)
  end

  def set_invite
    @invite = EventInvite.find_by(id: params[:id])
  end

  def verify_token!
    token = params[:token] || params.dig(:event_invite, :token)
    return head :precondition_failed unless @invite[:token] == token
  end

  def set_event
    @event = Event.find_by(id: params[:event_id]).decorate
  end

  def generate_token
    @token = SecureRandom.urlsafe_base64(nil, false)
  end

  def attendance_params
    params.require(:event_invite).permit(:email).merge(event_id: params[:event_id]).merge(token: @token)
  end

  def send_invite
    email_params = attendance_params.merge(invite_id: @invite.id)
    EventInviteMailer.with(email_params).event_email.deliver_later
  end
end
