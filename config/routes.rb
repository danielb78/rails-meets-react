Rails.application.routes.draw do
  # root 'start#index'
  root 'meetups#new'

  resources :meetups, only: %i[new create]
end
