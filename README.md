
## Description

cat adoption agency sample api

## Installation

```bash
$ npm install
```

## Run Postgres Database

```bash
$ docker-compose up
```

## Running the app

```bash
$ npm start
```

## Becoming admin
The endpoints for cats creation/deletion/update are only available for admin users. Change a user to be admin by updating the database record with `isAdmin` set to `true`.

A new authentication token has to be generated with the login endpoint after changing admin role.

## Postman Documentation
https://documenter.getpostman.com/view/131500/2sA35MxdWw#0800631d-f401-41c7-9eb5-93ba21cbe360
