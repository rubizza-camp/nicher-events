#:reek:NilCheck
class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session
  include DeviseTokenAuth::Concerns::SetUserByToken
  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up,
                                      keys: [
                                        :first_name,
                                        :last_name,
                                        :phone,
                                        :role,
                                        user_organization_attributes:
                                          [organization_attributes:
                                            %i[description name]]
                                      ])
  end

  def current_user
    super&.decorate
  end
end
