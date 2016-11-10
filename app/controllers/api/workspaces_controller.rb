class Api::WorkspacesController < ApplicationController
  def create
    @workspace = Workspace.new(workspace_params)

    if @workspace.save
      user = User.find_by_id(params[:user_id])
      @workspace.users.push(user)
      render :show
    else
      render json: @workspace.errors.full_messages, status: 422
    end
  end

  def show
    @workspace = Workspace.find_by_id(params[:id])
  end

  def index
    user_id = params[:user_id]

    @workspaces = Workspace.includes(:users).where(users: {id: user_id})
  end

  def destroy
    @workspace = Workspace.find_by_id(params[:id])
    @workspace.destroy
    render :index
  end

  def update
    @workspace = Workspace.find_by_id(params[:id])
    if @workspace.update(workspace_params)
      render :show
    else
      render json: @workspace.errors.full_messages, status: 422
    end
  end

  def edit
  end

  private
  def workspace_params
    params.require(:workspace).permit(:name)
  end
end
