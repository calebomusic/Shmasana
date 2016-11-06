class Api::ProjectsController < ApplicationController
  def index
    workspace_id = params[:workspace_id]
    @projects  = Project.where(workspace_id: workspace_id)
  end

  def show
    @project = Project.find_by_id(params[:id])
  end

  def create
    @project = Project.new(project_params)

    if @project.save
      workspace = Workspace.find_by_id(@project.workspace_id)
      workspace.projects.push(@project)
      render :show
    else
      render json: @project.errors.full_messages, status: 422
    end
  end

  private
  def project_params
    params.require(:project).permit(:name, :workspace_id)
  end
end
