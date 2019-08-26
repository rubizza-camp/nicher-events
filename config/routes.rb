Rails.application.routes.draw do
  root 'welcome#index'
  mount_devise_token_auth_for 'User', at: 'auth'
  namespace :api do
    namespace :v1 do
      resources :users
      resources :organizations
      resources :comments
    end
  end
  get '*page', to: 'welcome#index',
               constraints: ->(req) { !req.xhr? && req.format.html? }
end
