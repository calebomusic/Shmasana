class User < ActiveRecord::Base
  validates :password_digest, :session_token, :username, :email, presence: true
  validates :username, :email, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }
  validate :email, :valid_email?

  def valid_email?
    unless self.email =~ /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i
      errors.add(:email, "looks invalid, oops")
    end
  end

  has_many :join_user_workspaces
  has_many :workspaces,
    through: :join_user_workspaces,
    source: :workspace

  has_many :projects,
    through: :workspaces,
    source: :projects

  has_many :assigned_tasks,
    class_name: :Task,
    foreign_key: :assignee_id

  has_many :created_tasks,
    class_name: :Task,
    foreign_key: :author_id

  has_many :comments

  attr_reader :password
  after_initialize :ensure_session_token, :ensure_username

  def User.find_by_credentials(email, password)
    user = User.find_by(email: email)
    return nil if user.nil?
    user.is_password?(password) ? user : nil
  end

  def User.generate_session_token
    SecureRandom.urlsafe_base64(16)
  end

  def ensure_username
    self.username = self.email if self.username.nil?
  end

  def ensure_session_token
    self.session_token = User.generate_session_token
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token!
    self.session_token = User.generate_session_token
    self.save
    self.session_token
  end
end
