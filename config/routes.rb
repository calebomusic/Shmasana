Rails.application.routes.draw do

  get 'projects/index'

  get 'projects/show'

  get 'projects/create'

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create] do
      resources :workspaces, only: [:create, :index, :update, :show]
      resources :projects, only: [:index, :show]
    end

    # Allow the ability to show all projects?

    # resources :workspaces, only: [:index] do
    #   resources :projects, only: [:index]
    # end

    resources :workspaces, only: [:show] do
      resources :projects, only: [:create, :index, :show]
    end

    resource :session, only: [:create, :destroy]
  end

  root to: "static_pages#root"
end
