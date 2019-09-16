# :reek:InstanceVariableAssumption
class EventMailer < ActionMailer::Base
  default from: 'nicher@example.com'

  def cancelled_event_email
    @email = params[:email]
    @event = params[:event]
    @subscribers_email = params[:subscribers].pluck(:email)
    mail(to: @subscribers_email, subject: "Event \"#{@event.name}\" is cancelled")
  end
end
