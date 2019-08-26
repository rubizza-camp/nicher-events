Dir[File.join(__dir__, 'factory', '*.rb')].each { |file| require_relative file }

RSpec.configure do |config|
  config.include FactoryBot::Syntax::Methods
end
