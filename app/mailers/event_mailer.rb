# :reek:InstanceVariableAssumption
class EventMailer < ActionMailer::Base
  default from: 'nicher@example.com'

  def event_deleted_email
    @email = params[:email]
    @event = params[:event]
    @subscriber = params[:subscriber]
    mail(to: @subscriber.email, subject: 'Notify event deleted')
  end
end
