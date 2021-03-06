require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

Dotenv.load

module NicherEvents
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    # config.load_defaults 5.2

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration can go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded after loading
    # the framework and any gems in your application.
    # config.api_only = true
    config.middleware.insert_before 0, Rack::Cors do
      allow do
        origins 'http://localhost:3000'
        resource '*',
         :headers => :any,
         :expose => %w[access-token expiry token-type uid client],
         :methods => %i[get post patch delete]
      end
    end
    config.time_zone = 'Minsk'
  end
end
