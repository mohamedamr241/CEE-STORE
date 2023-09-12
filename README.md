# Storefront Backend Project

## Getting Started

This repo contains a basic Node and Express app to get you started in constructing an API. To get started: run npm in the terminal

## Technologies used

My application use the following libraries:

- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing
- cors for security
- Access token and refresh token for user signing in
- passport-google-oauth20 for signing in with google account
- multer for adding images of products and user profile image
- ejs template engine to handle front end
- nodemailer for sending email when user signup, place order and sending messages
- winston for handling logs of the server and the database

### Installing

Run this command for dependency managment
```bash
npm i
```

-To run server: npm run start
-To build the project: npm run build
-To run test:npm run test

### the environment

We start first by installing pg and dotenv using npm and then creating .env file to put in it all the senstive information to be hidden and including .env in .gitignore.


## setup and connect to the database

- installing Pool
```bash
npm i Pool
```
- create two databases: first: production , second: testing 
```bash
CREATE DATABASE (databasename)
```
- download db-migrate package
```bash
npm i db-migrate
```
- then run migrations
```bash
db-migrate env dev up
```

- first we import all the senstive data from .env file like host, database name, user and env state, then we create client using pool package (npm i Pool) -> let client: Pool = new Pool();
  and then by checking that ENV variable is dev for developer or test for testing and then create a connection with the database by assigning to the client:Pool host,database,user,password of the database which are determined in database.json

  ```json
  {
    "dev": {
      "driver": "pg",
      "host": {
        "ENV": "POSTGRES_HOST"
      },
      "database": {
        "ENV": "POSTGRES_DB"
      },
      "user": {
        "ENV": "POSTGRES_USER"
      },
      "password": {
        "ENV": "POSTGRES_PASSWORD"
      }
    },
    "test": {
      "driver": "pg",
      "host": {
        "ENV": "POSTGRES_HOST"
      },
      "database": {
        "ENV": "POSTGRES_TEST_DB"
      },
      "user": {
        "ENV": "POSTGRES_USER"
      },
      "password": {
        "ENV": "POSTGRES_PASSWORD"
      }
    }
  }
  ```

  - we have two databases: production this is for development and can be connected by running npm run start and production and testing is for testing and can be connected to by running npm run test.

  - as we see here there is a development database and testing database if you are running the server using npm run start development database will be connected but if you run npm run test then testing database will be connected.

  - after connecting to the database you should run the migration up (db-migrate up) to create the tables in the database.

By following this steps you have successfully connected to the database for development or for testing and the next step is creating your tables and migrating them in the database or run the tests (testing with jasmine).

## ports

- port in which the server is running on: 8000
- port of the database is in .env file hidden which is:5432

```bash
#.env
DB_PORT=5432
PORT=8000
```

## REDIS

- This app use redis for storing some user data so you should first go and install redis from this link 
```bash
https://github.com/microsoftarchive/redis/releases
```
- Install redis package
```bash
npm i redis
```

- Add this code for configuration of redis
```bash
import { createClient } from 'redis';
const redisClient = createClient();

redisClient.on('error', err => console.log('Redis Client Error', err));

const conn = async()=>{
    await redisClient.connect();
}
```
