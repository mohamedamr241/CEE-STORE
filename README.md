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

### Installing

Run this command for dependency managment: npm i

-To run server: npm run start
-To build the project: npm run build
-To run test:npm run test

### the environment

We start first by installing pg and dotenv using npm and then creating .env file to put in it all the senstive information to be hidden and including .env in .gitignore.


## setup and connect to the database

- installing Pool: npm i Pool
- create two databases: first: production , second: testing (CREATE DATABASE (databasename))
- download db-migrate package: npm i db-migrate
- then run migrations: db-migrate env dev up

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

