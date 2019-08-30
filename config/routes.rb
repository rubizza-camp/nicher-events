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
      resource  :event_objects
      resources :events do
        resources :attendances, only: [:create, :destroy]
      end
    end
  end

  get '*page', to: 'welcome#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
