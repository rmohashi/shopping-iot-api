# Shopping IoT API

## Setup

### Environment Setup

1. If necessary, update the datebase in your `docker-compose.yml` file:
1. Create a `.env` from `.env.sample` and edit with your configuration
1. Run `docker-compose up -d` to start the database
    * If you want to see the log, exclude the `-d` flag
    * To stop it, run `docker-compose stop`

### Installing dependencies

1. Run:
    ```bash
    npm install
    ```

## Running

### Develoment

1. Run to start the server:
    ```bash
    npm run start
    ```

## Project structure

| File name 　　　　　　　　　　　　　　| Description 　　　　　　　　<br><br>|
| :--  | :--         |
| `└── src ` (_directory_) | _Contains the source files for your GraphQL server_ |
| `　　├── index.ts` | The entry point for your GraphQL server |
| `　　├── core` (_directory_) | _Application's core files_ |
| `　　└── api` (_directory_) | _GraphQL API files_ |
| `　　　　├── modules` (_directory_) | The application modules |
| `　　　　└── server.ts` | API entry file |
