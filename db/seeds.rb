# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


u = User.create(username: 'Shmaleb', password: 'password', email: 'shmalebomusic@gmail.com')

w = []
w << Workspace.create(name: 'Full-Stack')
w << Workspace.create(name: 'Another-Workspace')

w.each { |w| w.users.push(u) }
