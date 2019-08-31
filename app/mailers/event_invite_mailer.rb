# :reek:InstanceVariableAssumption
# rubocop:disable Metrics/LineLength

class EventInviteMailer < ActionMailer::Base
  default from: ENV['EMAIL']

  def event_email
    @email = params[:email]
    @event_url = "#{ENV['PRODUCTION_HOST']}/events/#{params[:event_id]}/event_invites/#{params[:invite_id]}?token=#{params[:token]}"
    mail(to: @email, subject: 'Invite to private event')
  end
end
# rubocop:enable Metrics/LineLength
