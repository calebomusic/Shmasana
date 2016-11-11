class Api::TasksController < ApplicationController
  def index
    # All tasks in workspace
    if params[:workspace_id] && !params[:user_id]
      @tasks = Task.where(workspace_id: params[:workspace_id])

    # Created or assigned, project less tasks in workspace
    elsif params[:workspace_id] && params[:user_id]
      @tasks = Task.where("author_id = ? or assignee_id = ?", params[:user_id], params[:user_id]).where(project_id: nil)
      @tasks = @tasks.where(workspace_id: params[:workspace_id])

    # All assigned or created tasks
    elsif params[:user_id] && !params[:project_id]
      @tasks = Task.where("author_id = ? or assignee_id = ?", params[:user_id])

    # Created or assigned, tasks in project
    elsif params[:user_id] && params[:project_id]
      @tasks = Task.where(assignee_id: params[:user_id]).where(project_id: params[:project_id])

    # All tasks in project
    elsif params[:project_id]
      @tasks = Task.where(project_id: params[:project_id])
    end

    @tasks = @tasks.sort_by { |task| task.id }

    @tasks
  end

  def show
    @task = Task.find_by_id(params[:id])
    # @task.includes(:comments)
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

  def destroy
    @task = Task.find_by_id(params[:id])
    project = @task.project_id
    @task.destroy
    # Is this what I should render?
    render :index
  end

  private
  def task_params
    params.require(:task).permit(:author_id, :assignee_id, :project_id, :title,
                                :description, :due_date, :completed, :completed_at,
                                :id, :workspace_id, :created_at)
  end
end
