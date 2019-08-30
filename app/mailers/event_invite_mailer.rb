# :reek:InstanceVariableAssumption
# rubocop:disable Metrics/LineLength

class EventInviteMailer < ActionMailer::Base
  default from: 'nicher@example.com'

  def event_email
    @author = params[:author]
    @email = params[:email]
    @access_url = "#{ENV['PRODUCTION_HOST']}/events/#{params[:event_id]}/event_invites/#{params[:invite_id]}?token=#{params[:token]}"
    mail(from: @author, to: @email, subject: 'Invite to private event')
  end
end
# rubocop:enable Metrics/LineLength
