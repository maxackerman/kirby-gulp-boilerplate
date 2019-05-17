## Requirements
- Composer
- Node
- Ruby version 2.0 or higher

## Setup
- Run `npm install`
- Run `bundle install`
- You'll need to populate the content folder for kirby to run locally

## Development
`npm run build`

## Deploy
- `cap production deploy` will deploy the `dev` branch to staging
- `cap staging deploy` will deploy the `master` branch to production

## Troubleshooting
### Deployment
- Run `ssh -T git@github.com` to make sure ssh is authenticated
- Review: `/config/deploy.rb`, `/config/deploy/production.rb`, `/config/deploy/staging.rb`
- your public ssh key needs to be added the the deploy user on the server https://www.ssh.com/ssh/copy-id
- After an inital deploy, you will need to populate the linked content folders on the server in `/shared`
- The kirby license file goes on the server in `/shared/site/config/.license`
- Because of the Capistrano folder structure, the site will be accessible from the `/current` directory. Use a symlink to connect this to the root URL