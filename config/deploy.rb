# config valid for current version and patch releases of Capistrano
lock "~> 3.11.0"

set :application, "kirby-boilerplate"
set :repo_url, "git@github.com:maxackerman/kirby-boilerplate.git"

# use local ssh key, to give server access to github
set :ssh_options, forward_agent: true

# path to find Capistrano
set :default_env, { path: "/usr/local/bin:$PATH" }
SSHKit.config.command_map[:composer] = "/usr/local/bin/composer"

# set linked directoires that are not overwritten on server
append :linked_dirs, 'content', 'site/accounts', 'site/cache', 'media', 'assets/avatars'

# set linked files
append :linked_files, 'site/config/.license'

# run deploy tasks
before :deploy, "deploy:check_revision"
before :deploy, 'assets:compile'
after 'deploy:updated', 'assets:upload'