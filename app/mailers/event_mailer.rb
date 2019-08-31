# :reek:InstanceVariableAssumption
class EventMailer < ActionMailer::Base
  default from: 'nicher@example.com'

  def event_deleted_email
    @email = params[:email]
    @event = params[:event]
    @subscribers_email = params[:subscribers].pluck(:email)
    mail(to: @subscribers_email, subject: 'Notify event deleted')
  end
end
