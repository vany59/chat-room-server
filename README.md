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

## API Documentation
This project uses Swagger for API documentation.
Access the Swagger UI at: `<API_HOST>/swagger`