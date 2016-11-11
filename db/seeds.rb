# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

public
  def time_rand from = 0.0, to = Time.now
    Time.at(from + rand * (to.to_f - from.to_f))
  end

u0 = User.create(username: 'Shmaleb', password: 'password', email: 'shmalebomusic@gmail.com')
u1 = User.create(username: 'Charles', password: 'password', email: 'Charles@yahoo.com')
u2 = User.create(username: 'Linda', password: 'password', email: 'Linda@gmail.com')
u3 = User.create(username: 'Bob', password: 'password', email: 'Bob@gmail.com')
u4 = User.create(username: 'Emil', password: 'password', email: 'Emil@gmail.com')
u5 = User.create(username: 'James', password: 'password', email: 'James@gmail.com')
u6 = User.create(username: 'Colin', password: 'password', email: 'Colin@gmail.gov')
u7 = User.create(username: 'Robin', password: 'password', email: 'Robin@msn.com')
u8 = User.create(username: 'Jasmine', password: 'password', email: 'Jasmine@gmail.com')
u9 = User.create(username: 'Lex', password: 'password', email: 'Lex@gmail.com')
u10 = User.create(username: 'Waleb', password: 'password', email: 'Waleb@gmail.com')
u11 = User.create(username: 'Mark', password: 'password', email: 'Mark@nd.edu')
u12 = User.create(username: 'Ruthie', password: 'password', email: 'Ruthie@flc.edu')
u13 = User.create(username: 'Risa', password: 'password', email: 'Risa@gmail.com')
u14 = User.create(username: 'Theresa', password: 'password', email: 'Theresa@word.net')
u15 = User.create(username: 'Alredo', password: 'password', email: 'gmail@yahoo.com')

w1 = Workspace.create(name: 'Innovation')
w2 = Workspace.create(name: 'Paradigms')
w3 = Workspace.create(name: 'Business')

# Push users to workspaces
[u0,
u1,
u2,
u3,
u4,
u5,
u7].each { |u| w1.users.push(u)}

[u0,
u1,
u2,
u3,
u4,
u5,
u6,
u7,
u8,
u9,
u10].each { |u| w2.users.push(u)}

[ u1,
u3,
u4,
u5,
u6,
u7,
u8,
u9,
u10].each { |u| w3.users.push(u)}

p0 = Project.create(name: 'Design', workspace_id: w1.id )
p1 = Project.create(name: 'Market', workspace_id: w1.id)
p2 = Project.create(name: 'Ideas', workspace_id: w1.id)
p3 = Project.create(name: 'Rebuild', workspace_id: w1.id)
p4 = Project.create(name: 'Raise Awareness', workspace_id: w1.id)
p4 = Project.create(name: 'Shift Paradigms', workspace_id: w1.id)

# Tasks w/o project

# Guest user Tasks:

task = Task.create(title: '', workspace_id: w1.id, author_id: u0.id,
  description: "Infinity differentiates into subtle potentiality", assignee_id: u1.id )
task = Task.create(title: 'The Great Task', workspace_id: w1.id, author_id: u0.id,
  description: "The invisible reflects immortal force fields", assignee_id: u3.id )
task = Task.create(title: '', workspace_id: w1.id, author_id: u0.id, completed: true, completed_at: time_rand, assignee_id: u2.id )
task = Task.create(title: 'Do it', workspace_id: w1.id, author_id: u0.id, assignee_id: u1.id )
task = Task.create(title: 'Just do it', workspace_id: w1.id, author_id: u0.id, completed: true, completed_at: time_rand )
task = Task.create(title: 'New Task', workspace_id: w1.id, author_id: u0.id,
  description: "Infinity differentiates into subtle potentiality", assignee_id: u1.id )
task = Task.create(title: 'Prepare', workspace_id: w1.id, author_id: u0.id,
  description: "Infinity differentiates into subtle potentiality")

task = Task.create(title: 'Dream', workspace_id: w1.id, author_id: u0.id,
  description: "Infinity differentiates into subtle actuality", assignee_id: u1.id )
task = Task.create(title: 'Plan', workspace_id: w1.id, author_id: u0.id,
  description: "The invisible reflects immortal force fields", assignee_id: u3.id )
task = Task.create(title: '', workspace_id: w1.id, author_id: u0.id, completed: true, completed_at: time_rand, assignee_id: u2.id )
task = Task.create(title: 'Do it', workspace_id: w1.id, author_id: u0.id, assignee_id: u1.id )
task = Task.create(title: 'Just do it', workspace_id: w1.id, author_id: u0.id, completed: true, completed_at: time_rand )
task = Task.create(title: 'Just do it', workspace_id: w1.id, author_id: u0.id,
  description: "Infinity differentiates into subtle potentiality", assignee_id: u1.id )
task = Task.create(title: 'Prepare', workspace_id: w1.id, author_id: u0.id,
  description: "Infinity differentiates into subtle potentiality")

# Other user tasks

task = Task.create(title: '', workspace_id: w1.id, author_id: u1.id,
  description: "Infinity differentiates into subtle potentiality", assignee_id: u1.id )
task = Task.create(title: '', workspace_id: w1.id, author_id: u2.id,
  description: "The invisible reflects immortal force fields", assignee_id: u3.id )
task = Task.create(title: '', workspace_id: w1.id, author_id: u3.id, completed: true, completed_at: time_rand, assignee_id: u2.id )
task = Task.create(title: 'Do it', workspace_id: w1.id, author_id: u2.id, assignee_id: u1.id )
task = Task.create(title: 'Just do it', workspace_id: w1.id, author_id: u2.id, completed: true, completed_at: time_rand )
task = Task.create(title: 'New Task', workspace_id: w1.id, author_id: u1.id,
  description: "Infinity differentiates into subtle potentiality", assignee_id: u1.id )
task = Task.create(title: 'Prepare', workspace_id: w1.id, author_id: u1.id,
  description: "Infinity differentiates into subtle potentiality")

# Tasks w/ project
task = Task.create(title: 'Run', workspace_id: w1.id, author_id: u1.id, project_id: p0.id, assignee_id: u3.id)
task = Task.create(title: 'Energize', workspace_id: w1.id, author_id: u1.id, project_id: p0.id,
  description: "Infinity differentiates into subtle potentiality", completed: true, completed_at: time_rand, assignee_id: u1.id )
task = Task.create(title: 'Eat', workspace_id: w1.id, author_id: u2.id, project_id: p0.id,
  description: "Nature unfolds through incredible actions", completed: true, completed_at: time_rand, assignee_id: u2.id  )
task = Task.create(title: 'Sleep', workspace_id: w1.id, author_id: u2.id, project_id: p0.id,
  description: "Infinity differentiates into subtle potentiality", completed: true, completed_at: time_rand, assignee_id: u7.id )
task = Task.create(title: 'Repeat', workspace_id: w1.id, author_id: u4.id, project_id: p1.id,
  description: "The invisible reflects immortal force fields", assignee_id: u3.id)
task = Task.create(title: 'Run', workspace_id: w1.id, author_id: u1.id, project_id: p1.id,
  description: "The physical world creates intrinsic miracles", assignee_id: u2.id)
task = Task.create(title: 'Energize', workspace_id: w1.id, author_id: u1.id, project_id: p1.id,
  description: "Our consciousness is rooted in an abundance of balance", completed: true, completed_at: time_rand  )
task = Task.create(title: 'Eat', workspace_id: w1.id, author_id: u2.id, project_id: p1.id,
  description: "Nature unfolds through incredible actions", completed: true, completed_at: time_rand, assignee_id: u1.id  )
task = Task.create(title: 'Sleep', workspace_id: w1.id, author_id: u2.id, project_id: p1.id,
  description: "Our consciousness is rooted in an abundance of balance", assignee_id: u3.id)
task = Task.create(title: 'Repeat', workspace_id: w1.id, author_id: u4.id, project_id: p2.id,
  description: "The physical world creates intrinsic miracles", completed: true, completed_at: time_rand  )
ask = Task.create(title: 'Repeat', workspace_id: w1.id, author_id: u4.id, project_id: p2.id,
  description: "Infinity differentiates into subtle potentiality", assignee_id: u2.id)
task = Task.create(title: 'Run', workspace_id: w1.id, author_id: u1.id, project_id: p2.id,
  description: "Our consciousness is rooted in an abundance of balance", completed: true, completed_at: time_rand )
task = Task.create(title: 'Energize', workspace_id: w1.id, author_id: u1.id, project_id: p2.id,
  description: "Infinity differentiates into subtle potentiality", completed: true, completed_at: time_rand, assignee_id: u5.id )
task = Task.create(title: 'Eat', workspace_id: w1.id, author_id: u2.id, project_id: p2.id,
  description: "Our consciousness is rooted in an abundance of balance", assignee_id: u1.id)
task = Task.create(title: 'Sleep', workspace_id: w1.id, author_id: u2.id, project_id: p2.id,
  description: "Our consciousness is rooted in an abundance of balance", assignee_id: u5.id)
task = Task.create(title: 'Repeat', workspace_id: w1.id, author_id: u4.id, project_id: p2.id,
  description: "Nature unfolds through incredible actions", completed: true, completed_at: time_rand, assignee_id: u4.id  )
ask = Task.create(title: 'Repeat', workspace_id: w1.id, author_id: u4.id, project_id: p3.id,
  description: "Our consciousness is rooted in an abundance of balance", completed: true, completed_at: time_rand )
task = Task.create(title: 'Run', workspace_id: w1.id, author_id: u1.id, project_id: p3.id, assignee_id: u1.id)
task = Task.create(title: 'Energize', workspace_id: w1.id, author_id: u1.id, project_id: p3.id,
  description: "Infinity differentiates into subtle potentiality", completed: true, completed_at: time_rand )
task = Task.create(title: 'Eat', workspace_id: w1.id, author_id: u2.id, project_id: p3.id,
  description: "Our consciousness is rooted in an abundance of balance", completed: true, completed_at: time_rand )
task = Task.create(title: 'Sleep', workspace_id: w1.id, author_id: u2.id, project_id: p3.id )
task = Task.create(title: 'Repeat', workspace_id: w1.id, author_id: u4.id, project_id: p4.id,
  description: "Nature unfolds through incredible actions", completed: true, completed_at: time_rand, assignee_id: u2.id  )
ask = Task.create(title: 'Repeat', workspace_id: w1.id, author_id: u4.id, project_id: p4.id,
  description: "The physical world creates intrinsic miracles", assignee_id: u1.id )
task = Task.create(title: 'Run', workspace_id: w1.id, author_id: u1.id, project_id: p4.id,
  description: "Infinity differentiates into subtle potentiality", completed: true, completed_at: time_rand )
task = Task.create(title: 'Energize', workspace_id: w1.id, author_id: u1.id, project_id: p4.id,
  description: "Infinity differentiates into subtle potentiality", assignee_id: u5.id)
task = Task.create(title: 'Eat', workspace_id: w1.id, author_id: u2.id, project_id: p4.id,
  description: "The invisible reflects immortal force fields", completed: true, completed_at: time_rand )
task = Task.create(title: 'Sleep', workspace_id: w1.id, author_id: u2.id, project_id: p4.id,
  description: "Infinity differentiates into subtle potentiality", assignee_id: u2.id )
task = Task.create(title: 'Repeat', workspace_id: w1.id, author_id: u4.id, project_id: p4.id,
  description: "The invisible reflects immortal force fields" )

# Add completed at

# Add comments
