Rails.application.routes.draw do
  root 'welcome#index'
  
  namespace :api do
    resources :venues, except: [:index]
  end

  get '*page', to: 'static#index',
               constraints: ->(req) { !req.xhr? && req.format.html? }
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
