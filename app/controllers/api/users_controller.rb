class Api::UsersController < ApplicationController
  def create
    @user = User.new(user_params)

    if @user.save
      log_in!(@user)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def index
    workspace_id = params[:workspace_id]
    @users = User.includes(:workspaces).where(workspaces: {id: workspace_id})
  end

  def show
    @user = User.find_by(username: params[:id])
  end

  def invite
    @user = User.find_by_id(params[:user_id])
    @workspace = Workspace.find_by_id(params[:workspace_id])

    @workspace.users.push(@user)

    render :show
  end

  def find_user_by_username
    @user = User.find_by(username: params[:username])

    if @user
      render :show
    else
      render json: ['There are no users with that username'], status: 404
    end
  end

  private
  def user_params
    params.require(:user).permit(:email, :username, :password)
  end
end
