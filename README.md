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

## To do

* Docker deployment.

* Admin panel (to add new users and give them the ability to delete tags and tasks)

* Many other small `// TODO`-s scattered around the codebase which are usually minor code cleanups or ui adjustments, that do not affect the functionality.
