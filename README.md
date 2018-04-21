# Optikky

This project is the front-end of optical shop e-commerce website which is developed for AIT course

## Technologies
 - Angular 5
 - NodeJS + ExpressJS 

## Prerequisite
- NodeJS version 8.11.1
- Npm  version 5.6.0
- Angular 5

## Installation
- Open terminal/ cmd
- cd [location of the code]
- run `npm install` command in terminal/cmd
** this command will get all dependency to save in node_modules folder (the dependencies can be found in package.json)
*** Need to make sure that the version of dependencies that you installed is same as package.json

## Running the front-end

1. Open cmd/terminal cd to your file location
2. run `gulp tsc` command : to generate the javascript files for services folder(it will call back-end via REST API)
3. run `npm start` : to build the front-end project and running via port 5000 (this command already do proxy to connect with node server)
4. Open another teminal to run node server
5. cd to your file location
6. run `node app.js` : to run node server port 3000
7. open chrome with url: http://localhost:5000/
