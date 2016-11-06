Rails.application.routes.draw do
  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create] do
      resources :workspaces, only: [:create, :index, :update, :show]
      resources :projects, only: [:show] do
        resources :tasks, only: [:index]
      end
      resources :tasks, only: [:index]
    end

    # Allow the ability to show all projects?

    # resources :workspaces, only: [:index] do
    #   resources :projects, only: [:index]
    # end

    resources :workspaces, only: [:show] do
      resources :projects, only: [:create, :index, :show]
      resources :tasks, only: [:index]
    end

    # May not use the below:
    resources :projects, only: [:show] do
      resources :tasks, only: [:create, :update, :index]
    end
    resources :tasks, only: :show
    resource :session, only: [:create, :destroy]
  end

  root to: "static_pages#root"
end
