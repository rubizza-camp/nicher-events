# rubocop:disable Metrics/BlockLength
class ApidocsController < ActionController::Base
  include Swagger::Blocks

  swagger_root do
    key :swagger, '2.0'
    info do
      key :version, '1.0.0'
      key :title, 'Swagger Nicher-events'
      key :description, 'API that uses a nicher-events'
      # key :termsOfService, 'http://helloreverb.com/terms/'
      contact do
        key :name, 'Cybergizer'
      end
      license do
        key :name, 'MIT'
      end
    end
    tag do
      key :name, 'nicher'
      key :description, 'API for events navigation'
      externalDocs do
        key :description, 'Find more info here'
        key :url, 'https://swagger.io'
      end
    end
    security_definition :api_key, type: :apiKey do
      key :name, 'access-token'
      key :in, :header
    end
    security_definition :tokenType, type: :apiKey do
      key :name, 'token-type'
      key :in, :header
    end
    security_definition :client, type: :apiKey do
      key :name, 'client'
      key :in, :header
    end
    security_definition :expiry, type: :apiKey do
      key :name, 'expiry'
      key :in, :header
    end
    security_definition :uid, type: :apiKey do
      key :name, 'uid'
      key :in, :header
    end

    key :host, 'localhost:3000/'
    key :consumes, ['application/json']
    key :produces, ['application/json']
  end

  # A list of all classes that have swagger_* declarations.
  SWAGGERED_CLASSES = [
    Api::V1::AttendancesController,
    Api::V1::EventsController,
    Api::V1::EventInvitesController,
    Api::V1::OrganizationsController,
    Api::V1::VenuesController,
    Event,
    EventInvite,
    ErrorModel,
    ErrorListModel,
    Organization,
    Venue,
    self
  ].freeze

  def index
    render json: Swagger::Blocks.build_root_json(SWAGGERED_CLASSES)
  end
end
# rubocop:enable Metrics/BlockLength
