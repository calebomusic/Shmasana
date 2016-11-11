Rails.application.routes.draw do
  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :show, :index] do
      resources :workspaces, only: [:create, :index, :update, :show] do
        resources :tasks, only: [:index]
      end
      resources :projects, only: [:show] do
        resources :tasks, only: [:index]
      end
      resources :tasks, only: [:index]
    end

    resources :commments, only: [:show]

    resources :workspaces, only: [:show] do
      resources :projects, only: [:create, :index, :show]
      resources :tasks, only: [:index, :create]
      resources :users, only: [:index]
    end

    # May not use the below:
    resources :projects, only: [:show] do
      resources :tasks, only: [:update, :index]
    end
    resources :tasks, only: [:show, :destroy] do
      resources :comments, only: [:create, :index, :show]
    end
    
    resource :session, only: [:create, :destroy]
  end

  get 'invite/:user_id/:workspace_id', to: 'api/users#invite'

  get 'users/:username', to: 'api/users#find_user_by_username'

  root to: "static_pages#root"
end
