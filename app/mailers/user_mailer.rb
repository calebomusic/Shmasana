class UserMailer < ApplicationMailer

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.user_mailer.invite_to_workspace.subject
  #
  def invite_to_workspace(user)
    @user = user
    # Do I need the last workspace here?
    
    @greeting = "Hi"

    mail to: "to@example.org"
  end
end
