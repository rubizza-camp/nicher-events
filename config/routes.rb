Rails.application.routes.draw do
  # get '*page', to: 'static#index', constraints: ->(req) do
  #   !req.xhr? && req.format.html?
  # end
  root 'welcome#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
