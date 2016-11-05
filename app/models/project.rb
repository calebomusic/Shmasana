class Project < ActiveRecord::Base
  validates :name, presence: true

  belongs_to :workspaces
  # has_many :tasks
end
