class ProjectsController < ApplicationController
  def index
    if params[:user_id]
      user_id = params[:user_id]
      @project = Project.includes(:users).where(users: {id: user_id})
    else
      workspace_id = params[:workspace_id]
      @project = Project.includes(:users).where(users: {id: workspace_id})
    end
  end

  def show
    @project = Project.find_by_id(params[:id])

    if @project.save
      workspace = Workspace.find_by_id(@project.project_id)
      workspace.projects.push(@project)
      render :show
    else
      render json: @project.errors.full_messages, status: 422
    end
  end

  def create
    @project = Project.new(project_params)
  end

  private
  def project_params
    params.require(:project).permit(:name, :workspace_id)
  end
end
