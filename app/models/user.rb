class User < ActiveRecord::Base
  validates :password_digest, :session_token, :username, :email, presence: true
  validates :username, :email, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }

  has_many :workspacings
  has_many :workspaces,
    through: :workspacings,
    source: :workspace

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
