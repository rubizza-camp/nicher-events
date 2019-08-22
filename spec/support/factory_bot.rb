require_relative 'factory/factories'
require_relative 'factory/factory_organization'

RSpec.configure do |config|
  config.include FactoryBot::Syntax::Methods
end
