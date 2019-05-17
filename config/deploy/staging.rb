# server-based syntax
# ======================
# Defines a single server with a list of roles and multiple properties.
# You can define all roles on a single server, or split them:

server 'krypod.com', user: 'mackerman', roles: ['web']

# branch to deploy
set :branch, 'dev'

# use webfaction /tmp folder to execute
set :tmp_dir, "/home/mackerman/tmp"

# set remote directory
set :deploy_to, '/home/mackerman/webapps/kirby_boilerplate_dev'