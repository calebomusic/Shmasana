class Api::WorkspacesController < ApplicationController
  def create
    @workspace = Workspace.new(workspace_params)

    if @workspace.save
      render :show
    else
      render json: @workspace.errors.full_messages, status: 422
    end
  end

  def show
  end

  def index
    @workspaces = Workspace.all
  end

  def destroy
    @workspace = Workspace.find_by_id(params[:id])
    @workspace.destroy
    render :show
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
