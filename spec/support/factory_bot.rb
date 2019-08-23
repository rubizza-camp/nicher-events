require_relative 'factory/factories'
require_relative 'factory/factory_organization'
require_relative 'factory/factory_event'

RSpec.configure do |config|
  config.include FactoryBot::Syntax::Methods
end
