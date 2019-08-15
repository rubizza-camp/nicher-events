Rails.application.routes.draw do
  root 'welcome#index'
  get '*page', to: 'welcome#index',
               constraints: ->(req) { !req.xhr? && req.format.html? }
  mount_devise_token_auth_for 'User', at: 'auth'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
