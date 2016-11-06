class Api::TasksController < ApplicationController
  def index
    @tasks = Task.where(workspace_id: params[:workspace_id]) if params[:workspace_id]
    @tasks = Task.where(assignee_id: params[:user_id]) if params[:user_id] && !params[:project_id]

    if params[:user_id] && params[:project_id]
      @tasks = Task.where(assignee_id: params[:user_id]).where(project_id: params[:project_id])
    end

    @tasks = Task.where(project_id: params[:project_id]) if params[:project_id]

    @tasks
  end

  def show
    @task = Task.find_by_id(params[:id])
  end

  def create
    @task = Task.new(task_params)

    if @task.save
      render :show
    else
      render json: @task.errors.full_messages, status: 422
    end
  end

  def update
    @task = Task.find_by_id(params[:id])

    if @task.update(task_params)
      render :show
    else
      render json: @task.errors.full_messages, status: 422
    end
  end

  private
  def task_params
    params.require(:task).permit(:author_id, :assignee_id, :project_id, :title,
                                :description, :due_date, :completed, :completed_at)
  end
end
