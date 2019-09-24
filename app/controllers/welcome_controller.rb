class WelcomeController < ApplicationController
  def index
    render file: 'welcome/index.html'
  end
end
