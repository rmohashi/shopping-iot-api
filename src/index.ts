import * as dotenv from 'dotenv';
import { Server } from './api/server';
import Container from 'typedi';
import 'reflect-metadata';

dotenv.config();

const server = Container.get(Server);

server.configure()
  .then(() => {
    server.start();
  });
