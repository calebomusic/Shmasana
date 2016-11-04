Rails.application.routes.draw do

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create] do
      resources :workspaces, only: [:create, :index, :update, :show]
    end
    resources :workspaces, only: []
    resource :session, only: [:create, :destroy]
  end

  root to: "static_pages#root"
end
