# CVWO frontend

Task Management System frontend server in Typescripted ReactJS with Redux.

## Requirements

* node >= 12.0.0

* npm installed

## Dev server

Installation is assumed to be done on a fresh copy of Ubuntu.

* `yarn install`

* Configure `src/api/client.ts` with the endpoint of the API server.

* `yarn start`

## Deployment

* `yarn build`

* `serve -s build`

## Some points to note

* Only admins can delete tasks and tags.

* Only admins can create users.

* Only admins and user who owns the task can modify it (i.e. change title, description, assigned tags).

* Any user can create tasks and tags.

## To do

* Docker deployment.

* Many other small `// TODO`-s scattered around the codebase which are usually minor code cleanups or ui adjustments, that do not affect the functionality.

* Use .ENV for configurations instead
