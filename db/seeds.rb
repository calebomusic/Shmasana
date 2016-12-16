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
u6 = User.create(username: 'Connor', password: 'password', email: 'Conorn@gmail.gov')
u7 = User.create(username: 'Robin', password: 'password', email: 'Robin@msn.com')
u8 = User.create(username: 'Jasmine', password: 'password', email: 'Jasmine@gmail.com')
u9 = User.create(username: 'Lex', password: 'password', email: 'Lex@gmail.com')
u10 = User.create(username: 'Waleb', password: 'password', email: 'Waleb@gmail.com')
u11 = User.create(username: 'Mark', password: 'password', email: 'Mark@nd.edu')
u12 = User.create(username: 'Ruthie', password: 'password', email: 'Ruthie@flc.edu')
u13 = User.create(username: 'Risa', password: 'password', email: 'Risa@gmail.com')
u14 = User.create(username: 'Theresa', password: 'password', email: 'Theresa@word.net')
u15 = User.create(username: 'Alredo', password: 'password', email: 'gmail@yahoo.com')

w1 = Workspace.create(name: 'Occupy Mars')
w2 = Workspace.create(name: 'Personal')
w3 = Workspace.create(name: 'Gardening')

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

p0 = Project.create(name: 'Spaceship', workspace_id: w1.id )
p1 = Project.create(name: 'Space School', workspace_id: w1.id)
p2 = Project.create(name: 'Ideas', workspace_id: w1.id)
p3 = Project.create(name: 'Rebuild', workspace_id: w1.id)
p4 = Project.create(name: 'Raise Awareness', workspace_id: w1.id)
p4 = Project.create(name: 'Shift Paradigms', workspace_id: w1.id)

# Guest user Tasks:

task1 = Task.create(title: 'Design Flag', workspace_id: w1.id, author_id: u0.id,
  description: "Design flag to place on Mars!", assignee_id: u2.id )
task2 = Task.create(title: 'Recruit team of astronauts', workspace_id: w1.id, author_id: u0.id,
  description: "Junior astronauts accepted", assignee_id: u3.id )
task3 = Task.create(title: 'Purchase appopriate spaceship and accessories',
 description: 'See also: spaceship project', workspace_id: w1.id, author_id: u0.id, completed: true, completed_at: time_rand, assignee_id: u2.id )
task4 = Task.create(title: 'Organize anti-gravity training sesssion', workspace_id: w1.id, author_id: u0.id, assignee_id: u1.id )
task5 = Task.create(title: 'Just do it', workspace_id: w1.id, author_id: u0.id, completed: true, completed_at: time_rand )
task6 = Task.create(title: 'Organize water discussion', workspace_id: w1.id, author_id: u0.id,
  description: "Discuss the possibility that there is no water", assignee_id: u1.id )
task7 = Task.create(title: 'Blockchain video production machine learning', workspace_id: w1.id, author_id: u0.id,
  description: "Infinity differentiates into subtle potentiality")

task = Task.create(title: 'Notify media of launch', workspace_id: w1.id, author_id: u0.id,
  description: "Notify all the media", assignee_id: u1.id )
task = Task.create(title: 'Run safety check of spaceship', workspace_id: w1.id, author_id: u0.id,
  description: "Saftey first", assignee_id: u3.id )
task = Task.create(title: '', workspace_id: w1.id, author_id: u0.id, completed: true, completed_at: time_rand, assignee_id: u2.id )
task = Task.create(title: 'Occupy mMars', workspace_id: w1.id, author_id: u0.id, assignee_id: u1.id )
task8 = Task.create(title: 'Just do it', workspace_id: w1.id, author_id: u0.id, completed: true, completed_at: time_rand )
task = Task.create(title: 'Just do it', workspace_id: w1.id, author_id: u0.id,
  description: "Infinity differentiates into subtle potentiality", assignee_id: u1.id )

# Other user tasks

task = Task.create(title: 'Buy spacefood', workspace_id: w1.id, author_id: u1.id,
  description: "No Soylent", assignee_id: u1.id )
task = Task.create(title: 'Find Mars Rover', workspace_id: w1.id, author_id: u2.id,
  description: "Keep this task on down low.", assignee_id: u3.id )
task = Task.create(title: 'Where is the Mars Rover?', workspace_id: w1.id, author_id: u3.id, completed: true, completed_at: time_rand, assignee_id: u2.id )
task = Task.create(title: 'Do it', workspace_id: w1.id, author_id: u2.id, assignee_id: u1.id )
task = Task.create(title: 'Just do it', workspace_id: w1.id, author_id: u2.id, completed: true, completed_at: time_rand )
task = Task.create(title: 'Prepare for meeting other lifeforms', workspace_id: w1.id, author_id: u1.id,
  description: "Infinity differentiates into subtle potentiality", assignee_id: u1.id )
task = Task.create(title: 'Buy spacebooks', workspace_id: w1.id, author_id: u1.id,
  description: "Kurt Vonnegut!")

# Spaceship
task9 = Task.create(title: 'Compare SpaceX and BlueOrigin', workspace_id: w1.id, author_id: u1.id, project_id: p0.id, assignee_id: u3.id)
task10 = Task.create(title: 'Collect movie titles for the trip', workspace_id: w1.id, author_id: u1.id, project_id: p0.id,
  description: "Avoid space horror", completed: true, completed_at: time_rand, assignee_id: u1.id )
task11 = Task.create(title: 'Call Elon', workspace_id: w1.id, author_id: u2.id, project_id: p0.id,
  description: "", completed: true, completed_at: time_rand, assignee_id: u2.id  )
task12 = Task.create(title: 'Call Jeff', workspace_id: w1.id, author_id: u2.id, project_id: p0.id,
  description: "", completed: true, completed_at: time_rand, assignee_id: u7.id )
task13 = Task.create(title: 'Purchase space couch', workspace_id: w1.id, author_id: u4.id, project_id: p0.id,
  description: "The invisible reflects immortal force fields", assignee_id: u3.id)
task14 = Task.create(title: 'Call recruiters', workspace_id: w1.id, author_id: u1.id, project_id: p0.id,
  description: "The physical world creates intrinsic miracles", assignee_id: u2.id)
task = Task.create(title: 'Energize team', workspace_id: w1.id, author_id: u1.id, project_id: p0.id,
  description: "Our consciousness is rooted in an abundance of balance", completed: true, completed_at: time_rand  )
task15 = Task.create(title: 'Find best microwave', workspace_id: w1.id, author_id: u2.id, project_id: p0.id,
  description: "Don't be cheap", completed: true, completed_at: time_rand, assignee_id: u1.id  )
task = Task.create(title: 'Nap', workspace_id: w1.id, author_id: u2.id, project_id: p0.id,
  description: "", assignee_id: u3.id)
task = Task.create(title: 'Compare food options', workspace_id: w1.id, author_id: u4.id,
  description: "", completed: true, completed_at: time_rand  )
ask = Task.create(title: 'Blueprint', workspace_id: w1.id, author_id: u4.id,
  description: "Infinity differentiates into subtle potentiality", assignee_id: u2.id)


# SpaceSchool
task = Task.create(title: 'Teach astroengineering', workspace_id: w1.id, author_id: u1.id, project_id: p1.id, assignee_id: u3.id)
task = Task.create(title: '', workspace_id: w1.id, author_id: u1.id, project_id: p1.id,
  description: "Talk to promising astronauts", completed: true, completed_at: time_rand, assignee_id: u1.id )
task = Task.create(title: 'Call NASA', workspace_id: w1.id, author_id: u2.id, project_id: p1.id,
  description: "", completed: true, completed_at: time_rand, assignee_id: u2.id  )
task = Task.create(title: 'Discuss student progress with TAs', workspace_id: w1.id, author_id: u2.id, project_id: p1.id,
  description: "", completed: true, completed_at: time_rand, assignee_id: u7.id )
task = Task.create(title: 'Improve gym', workspace_id: w1.id, author_id: u4.id, project_id: p1.id,
  description: "", assignee_id: u3.id)
task = Task.create(title: 'Hold assembly', workspace_id: w1.id, author_id: u1.id, project_id: p1.id,
  description: "The physical world creates intrinsic miracles", assignee_id: u2.id)
task = Task.create(title: 'Recruit developers', workspace_id: w1.id, author_id: u1.id, project_id: p1.id,
  description: "Our consciousness is rooted in an abundance of balance", completed: true, completed_at: time_rand  )
task = Task.create(title: 'Find best microwave', workspace_id: w1.id, author_id: u2.id, project_id: p1.id,
  description: "Don't be cheap", completed: true, completed_at: time_rand, assignee_id: u1.id  )
task = Task.create(title: 'Hold flag design contest', workspace_id: w1.id, author_id: u2.id, project_id: p1.id,
  description: "", assignee_id: u3.id)
task = Task.create(title: 'Improve cafeteria food', workspace_id: w1.id, author_id: u4.id,
  description: "Add different soylent flavor?", completed: true, completed_at: time_rand, project_id: p1.id )
ask = Task.create(title: 'Have a determinate plan for the future', workspace_id: w1.id, author_id: u4.id,
  description: "Infinity differentiates into subtle potentiality", assignee_id: u2.id, project_id: p1.id,)

# Personal tasks
task = Task.create(title: 'Run', workspace_id: w2.id, author_id: u1.id, assignee_id: u3.id)
task = Task.create(title: 'Energize', workspace_id: w2.id, author_id: u1.id,
  description: "Infinity differentiates into subtle potentiality", completed: true, completed_at: time_rand, assignee_id: u1.id )
task = Task.create(title: 'Eat', workspace_id: w2.id, author_id: u2.id,
  description: "Nature unfolds through incredible actions", completed: true, completed_at: time_rand, assignee_id: u2.id  )
task = Task.create(title: 'Sleep', workspace_id: w2.id, author_id: u2.id,
  description: "Infinity differentiates into subtle potentiality", completed: true, completed_at: time_rand, assignee_id: u7.id )
task = Task.create(title: 'Repeat', workspace_id: w2.id, author_id: u4.id,
  description: "The invisible reflects immortal force fields", assignee_id: u3.id)
task = Task.create(title: 'Run', workspace_id: w2.id, author_id: u1.id,
  description: "The physical world creates intrinsic miracles", assignee_id: u2.id)
task = Task.create(title: 'Energize', workspace_id: w2.id, author_id: u1.id,
  description: "Our consciousness is rooted in an abundance of balance", completed: true, completed_at: time_rand  )
task = Task.create(title: 'Eat', workspace_id: w2.id, author_id: u2.id,
  description: "Nature unfolds through incredible actions", completed: true, completed_at: time_rand, assignee_id: u1.id  )
task = Task.create(title: 'Sleep', workspace_id: w2.id, author_id: u2.id,
  description: "Our consciousness is rooted in an abundance of balance", assignee_id: u3.id)
task = Task.create(title: 'Repeat', workspace_id: w2.id, author_id: u4.id,
  description: "The physical world creates intrinsic miracles", completed: true, completed_at: time_rand  )
ask = Task.create(title: 'Repeat', workspace_id: w2.id, author_id: u4.id,
  description: "Infinity differentiates into subtle potentiality", assignee_id: u2.id)
task = Task.create(title: 'Run', workspace_id: w2.id, author_id: u1.id,
  description: "Our consciousness is rooted in an abundance of balance", completed: true, completed_at: time_rand )
task = Task.create(title: 'Energize', workspace_id: w2.id, author_id: u1.id,
  description: "Infinity differentiates into subtle potentiality", completed: true, completed_at: time_rand, assignee_id: u5.id )
task = Task.create(title: 'Eat', workspace_id: w2.id, author_id: u2.id,
  description: "Our consciousness is rooted in an abundance of balance", assignee_id: u1.id)
task = Task.create(title: 'Sleep', workspace_id: w2.id, author_id: u2.id,
  description: "Our consciousness is rooted in an abundance of balance", assignee_id: u5.id)
task = Task.create(title: 'Repeat', workspace_id: w2.id, author_id: u4.id,
  description: "Nature unfolds through incredible actions", completed: true, completed_at: time_rand, assignee_id: u4.id  )
ask = Task.create(title: 'Repeat', workspace_id: w2.id, author_id: u4.id,
  description: "Our consciousness is rooted in an abundance of balance", completed: true, completed_at: time_rand )
task = Task.create(title: 'Run', workspace_id: w2.id, author_id: u1.id, assignee_id: u1.id)
task = Task.create(title: 'Energize', workspace_id: w2.id, author_id: u1.id,
  description: "Infinity differentiates into subtle potentiality", completed: true, completed_at: time_rand )
task = Task.create(title: 'Eat', workspace_id: w2.id, author_id: u2.id,
  description: "Our consciousness is rooted in an abundance of balance", completed: true, completed_at: time_rand )
task = Task.create(title: 'Sleep', workspace_id: w2.id, author_id: u2.id )
task = Task.create(title: 'Repeat', workspace_id: w2.id, author_id: u4.id,
  description: "Nature unfolds through incredible actions", completed: true, completed_at: time_rand, assignee_id: u2.id  )
ask = Task.create(title: 'Repeat', workspace_id: w2.id, author_id: u4.id,
  description: "The physical world creates intrinsic miracles", assignee_id: u1.id )
task = Task.create(title: 'Run', workspace_id: w2.id, author_id: u1.id,
  description: "Infinity differentiates into subtle potentiality", completed: true, completed_at: time_rand )
task = Task.create(title: 'Energize', workspace_id: w2.id, author_id: u1.id,
  description: "Infinity differentiates into subtle potentiality", assignee_id: u5.id)
task = Task.create(title: 'Eat', workspace_id: w2.id, author_id: u2.id,
  description: "The invisible reflects immortal force fields", completed: true, completed_at: time_rand )
task = Task.create(title: 'Sleep', workspace_id: w2.id, author_id: u2.id,
  description: "Infinity differentiates into subtle potentiality", assignee_id: u2.id )
task = Task.create(title: 'Repeat', workspace_id: w2.id, author_id: u4.id,
  description: "The invisible reflects immortal force fields" )

# Add completed at

# Add comments

Comment.create(task_id: task2.id, author_id: u0.id, body: "Let's find the best astronauts!" )
Comment.create(task_id: task1.id, author_id: u0.id, body: "Let's have a lot of color!" )
Comment.create(task_id: task1.id, author_id: u2.id, body: "On it as soon as I find the rover.")
Comment.create(task_id: task1.id, author_id: u3.id, body: "?" )
Comment.create(task_id: task4.id, author_id: u1.id , body: "Can't wait for another training session!")
Comment.create(task_id: task5.id, author_id: u0.id , body: "Just did it")
Comment.create(task_id: task6.id, author_id: u1.id, body: "Can't wait for another discussion.")
Comment.create(task_id: task6.id, author_id: u2.id , body: "This issue is very important!" )
Comment.create(task_id: task7.id, author_id: u3.id , body: "?" )

Comment.create(task_id: task9.id, author_id: u0.id, body: "I favor SpaceX" )
Comment.create(task_id: task10.id, author_id: u2.id, body: "Don't forget about this!" )
Comment.create(task_id: task10.id, author_id: u1.id, body: "Completed!")
Comment.create(task_id: task12.id, author_id: u2.id, body: "Had a very pleasant conversation earlier" )
Comment.create(task_id: task13.id, author_id: u3.id , body: "?")
Comment.create(task_id: task13.id, author_id: u0.id , body: "This is important, Bob!")
Comment.create(task_id: task13.id, author_id: u1.id, body: "!")
Comment.create(task_id: task14.id, author_id: u2.id , body: "This issue is very important!" )
Comment.create(task_id: task9.id, author_id: u3.id , body: "?" )
