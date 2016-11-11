class Api::CommentsController < ApplicationController
  def create
    @comment = Comment.new(comment_params)
    @comment.author_id = current_user.id
    @comment.task_id = params[:task_id]

    @comment.save
    render :show
  end

  def show
    @comment = Comment.find_by_id(params[:id])
  end

  def index
    @comments = Comment.where(task_id: params[:task_id])
  end

  private
  def comment_params
    params.require(:comment).permit(:body, :author_id, :task_id)
  end
end
