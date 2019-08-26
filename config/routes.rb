Rails.application.routes.draw do
  root 'welcome#index'

  mount_devise_token_auth_for 'User', at: 'auth'
  namespace :api do
    namespace :v1 do
      resources :users
      resources :organizations
      resources :events do
        resources :attendances, only: [:create, :destroy]
        # delete :attendances, to: 'attendances#destroy'
      end
      resources :users, :venues
    end
  end

  get '*page', to: 'welcome#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
