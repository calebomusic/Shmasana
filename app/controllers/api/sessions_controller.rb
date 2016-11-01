class Api::SessionsController < ApplicationController
  def create
    @user = User.find_by_credentials(session_params[:email], session_params[:password])

    if @user
      log_in!(@user)
      render 'api/users/show'
    else
      render json: ['The username or password is not correct.'], status: 401
    end
  end

  def destroy
    @user = current_user

    if @user
      log_out!
      # TODO: may change
      render json: {}
    else
      render json: ['No user to log out'], status: 404
    end
  end

  private
  def session_params
    params.require(:user).permit(:email, :password)
  end
end
