Rails.application.routes.draw do
  root 'welcome#index'
  namespace :api do
    namespace :v1 do
      resources :organizations
    end
  end
  mount_devise_token_auth_for 'User', at: 'auth'
  namespace :api do
    namespace :v1 do
      resources :users
    end
  end
  get '*page', to: 'welcome#index',
               constraints: ->(req) { !req.xhr? && req.format.html? }
end
