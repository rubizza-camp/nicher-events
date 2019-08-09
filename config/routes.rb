Rails.application.routes.draw do
  root 'welcome#index'
  mount_devise_token_auth_for 'User', at: 'auth'
  namespace :api do
    namespace :v1 do
      resources :users
      resources :organizations
      resources :events
    end

  namespace :api do
    resources :venues, except: [:index]
  end
end
   get '*page', to: 'static#index',
                constraints: ->(req) { !req.xhr? && req.format.html? }
end
