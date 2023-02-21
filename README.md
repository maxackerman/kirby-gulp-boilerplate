## Build tools
- [Gulp](https://gulpjs.com/)
- [Sass](https://sass-lang.com/) + [Autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer)
- [Webpack](https://webpack.js.org/)
- [BrowserSync](https://www.browsersync.io/)

## Deploy
- Github Action + RSYNC

## Requirements
- [Composer](https://getcomposer.org/)
- [Node](https://nodejs.org/)
- Local server running PHP (e.g. [Valet](https://laravel.com/docs/valet))

## Setup
- Run `npm install`
- Run `composer install`
- You'll need to populate the content folder for kirby to run locally `content/site.txt` `content/home/home.txt`

## Development
- Setup a local server, and add the local url to `.env`. Example: `LOCAL_URL = 'http://example.localhost/'`
- `npm run dev` will watch files and process them on when updated. Updates will be reflected on browsersync proxy url.
- `npm run build` will run once and generate the minified produciton files.

## Update
- `composer update` to update Kirby

## Deploy
Github will need SSH access to the server to deploy via rsync
- Generate a new SSH key and put the secret in github repo secrets
- Public Key goes on the server