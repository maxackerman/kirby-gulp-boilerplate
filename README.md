## Build tools
- [Gulp](https://gulpjs.com/)
- [Sass](https://sass-lang.com/) + [Autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer)
- [Webpack](https://webpack.js.org/) + [Babel](https://babeljs.io/)
- [BrowserSync](https://www.browsersync.io/)

## Deploy
- [Capistrano](https://capistranorb.com/)

## Requirements
- [Composer](https://getcomposer.org/)
- [Node](https://nodejs.org/)
- Local server running PHP (e.g. [Valet](https://laravel.com/docs/5.8/valet) or [MAMP](https://www.mamp.info/))
- Ruby (optional for deploy)

## Setup
- Run `npm install`
- Run `composer install`
- Run `bundle install` (optional for deploy)
- You'll need to populate the content folder for kirby to run locally

## Development
`npm run build`

## Update
- `composer update` to update Kirby

## Deploy
- `cap production deploy` will deploy the `master` branch to production
- `cap staging deploy` will deploy the `dev` branch to staging

## Troubleshooting
### Deployment
- You'll need to have ssh access to your git repo. If using github, run `ssh -T git@github.com` to make sure ssh is authenticated
- Review: `/config/deploy.rb`, `/config/deploy/production.rb`, `/config/deploy/staging.rb`
- Your public ssh key needs to be added the the deploy user on the server https://www.ssh.com/ssh/copy-id
- After an inital deploy, you will need to populate the linked content folders on the server in `/shared`
- The kirby license file goes on the server in `/shared/site/config/.license`
- Because of the Capistrano folder structure, the site will be accessible from the `/current` directory. The name of the folder can be changed in the Capistrano config. You can use a symlink to connect this directory to the root URL.
