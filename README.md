Hugo Excercise
==============

This project is split into two parts, an API server, and a React frontend.

The API server uses Nest JS, and the frontend uses Next JS.

Setup
-----

### API

```sh
cd api
cp .env.example .env.local
psql postgres --command='create database hugo_exercise_development'
yarn install
yarn start:dev
```

The API uses Postgres, which will need to be installed. It should auto-migrate
the first time the server is run.

### Frontend

```sh
cd frontend
cp .env.example .env.local
yarn install
yarn next:dev
```

Visit `http://localhost:3000` in your browser.
