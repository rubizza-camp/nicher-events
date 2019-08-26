Rails.application.routes.draw do
  root 'welcome#index'
  mount_devise_token_auth_for 'User', at: 'auth',controllers:  {
      registrations: 'api/v1/registrations',
  }
  namespace :api do
    namespace :v1 do
      resources :users
      resources :organizations
      resources :venues
      resources :events do
        resources :attendances, only: [:create, :destroy]
        resources :event_invites, only: [:create, :show, :update]
      end
      resources :comments
    end
  end

  get '*page', to: 'welcome#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
