class ApplicationController < ActionController::Base
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
                                            %i[id description name]]
                                      ])
  end
end
