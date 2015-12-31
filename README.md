Munkirjat V4...V5

# Installation & running

## Initial setup

* `cp config.js.dist to config.js` (and set required params)
* `cp .env.dist to .env` (and set required params)
* `npm install`
* `npm run start`
* Visit http://localhost:5688 

## Production

* `npm run deploy`
* Visit website

## PM2 settings

pm2 start src/server.js --interpreter ./node_modules/.bin/babel-node --log munkirjat.log

## Nginx

* use docs/nginx.conf.dist as a base

## Auth0

This project uses Auth0 (https://auth0.com/) for user authentication/authorization. You will need to create an account and setup the project accordingly. 

See files `.env` and `src/config.js`:

* `AUTH0_CLIENT_ID=`
* `AUTH0_CLIENT_SECRET=`
* `AUTH0_DOMAIN=munkirjat.eu.auth0.com`
* `'auth0': {
        'client_id': '',
        'domain': ''
    }`   
