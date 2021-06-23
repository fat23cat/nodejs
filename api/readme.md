# Users API

## Environment setup

Create `.env` file in the `src` directory with the following structure:

```
DB_NAME=
DB_USER=
DB_PASSWORD=
DB_URL=localhost
SECRET_KEY=
PORT=8080
```

where you need to specify your database name, database user, password, token secret key, and the node app port.

## API documentation

https://documenter.getpostman.com/view/3013594/TzCP6SiU#fe893ad5-3350-47cf-a67a-6bc83b3c06f2

## Install dependencies

Run `npm ci`

## Data generation

- Install Postgres server and pgAdmin 4
- Run `npm run migrate` and `npm run seed` to create tables and fill them
- Run `npm run seed:undo` and `npm run migrate:undo` to remove data and tables

## Run server app

`npm run server`

## Run tests

`npm run test`
