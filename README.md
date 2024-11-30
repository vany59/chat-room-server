# Chat room server

## Overview
This document outlines the key features, architectural approach, and setup instructions for the chat room server application. The project leverages NestJS, a progressive framework for building efficient and scalable server-side applications in TypeScript.

## Core Features
1. User Management
    * Endpoints to create and manage users.
    * Handle "connected" status via WebSocket events.
2. Chat Room Management
    * CRUD for chat rooms.
    * Restrict deletion to the creator of the room.
3. Messaging
    * Use Socket.IO for message broadcasting.
    * Enable editing of the last message with validation.
4. Real-Time Updates
    * Notify participants when users join/leave rooms or send messages.

## Architectural Approach: Modular Monolith
Folder structure:

```
src/
├── app.controller.spec.ts
├── app.controller.ts
├── app.module.ts
├── app.service.ts
├── common
│   └── decorators.ts
├── config
│   ├── configuration.ts
│   ├── env.validation.ts
│   └── type-orm.ts
├── database
│   ├── database.module.ts
│   └── migrations
│       └── 1732818661089-user.ts
├── events
│   ├── dto
│   │   ├── join-room.dto.ts
│   │   ├── leave-room.dto.ts
│   │   └── new-message.dto.ts
│   ├── events.gateway.ts
│   └── events.module.ts
├── main.ts
├── migrations
└── modules
    ├── auth
    │   ├── auth.controller.spec.ts
    │   ├── auth.controller.ts
    │   ├── auth.dto.ts
    │   ├── auth.guard.ts
    │   ├── auth.module.ts
    │   ├── auth.service.spec.ts
    │   └── auth.service.ts
    ├── messages
    │   ├── dto
    │   ├── message.controller.ts
    │   ├── message.entity.ts
    │   ├── message.module.ts
    │   └── message.service.ts
    ├── rooms
    │   ├── dto
    │   ├── room-participant.entity.ts
    │   ├── room.controller.spec.ts
    │   ├── room.controller.ts
    │   ├── room.entity.ts
    │   ├── room.module.ts
    │   ├── room.service.ts
    │   └── rooms.service.spec.ts
    └── users
        ├── user.entity.ts
        ├── users.module.ts
        ├── users.service.spec.ts
        └── users.service.ts
```
Why Choose Modular Monolith?
A modular monolithic architecture offers a clean and scalable structure while remaining straightforward to implement. Here’s why it’s a great fit for this project:

1. Simplicity
    * Centralized codebase simplifies development and debugging.
    * Suitable for smaller teams and projects with limited scope.
2. Separation of Concerns
    * Divides the application into distinct modules (e.g., Users, Chat Rooms, Messages).
    * Ensures clear boundaries between functionalities.
3. Scalability
    * The monolithic application can scale horizontally.
    * Future-proof: Modules can transition to microservices if the need arises.
4. Ease of Maintenance
    * Modular design allows independent development, testing, and maintenance of features.



## Project setup

```bash
$ yarn install
```

## Compile and run the project

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Run tests

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Run with docker
### Prerequisites
* Install Docker on your system.
* Install Docker Compose for multi-container setups
### Run
```
docker-compose up -d
```

## Environment variables
The following is an example .env file for configuring the environment variables required by the application. Each variable is described to ensure clarity on its purpose and correct usage.
```
TRUSTED_DOMAIN=*  
NODE_ENV=development  
PORT=3000  
THROTTLE_TTL=60000  
THROTTLE_LIMIT=100  

POSTGRES_HOST=postgres-db  
POSTGRES_PORT=5432  
POSTGRES_USER=postgres  
POSTGRES_PASSWORD=123456  
POSTGRES_CHAT_DB_NAME=test  
POSTGRES_SYNC=true  

JWT_SECRET=39e9a71d25227ee66e92af54614bfa9e8fe13a165cebd3599a69d93df834ba97eccfe1eb6709bac71adc441f258a6ee8fc57b1565b12ab7ee61eac6b52c11b36adaaf382963fa73b0b97ef0ab9826481d4dc00c9a197054a5e7b6f15a0912036ff5de9a2339ba8f40554e27328535951a3d5060528a1aeb06c916b301eb54539a263521a71856a6d7b318eca488be4655025a6b05c3c632f8dd473fe62491803000e7a69ff4fdf0b5dbb197be2747b1398e047f150b5175304b4d805f1536ac27c043bcab88e56d23e04992adb9d015a55e8470aa442f050a67de4c5a5ee60fba5ae9c3af3e0af6e77960f4e872bc5b4ee6cae92375550fd9d1fa82471981105  
JWT_EXPIRATION=1d  

WS_PORT=3001  

```
Note: For docker-compose, ensure that the POSTGRES_HOST environment variable is set to `postgres-db`, which matches the `container_name` defined in the `docker-compose.yml` 
## API Documentation
This project uses Swagger for API documentation.
Access the Swagger UI at: `<API_HOST>/swagger`