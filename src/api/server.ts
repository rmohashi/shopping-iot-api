import { Options, GraphQLServer } from 'graphql-yoga';
import { fileLoader } from 'merge-graphql-schemas';
import * as path from 'path';
import { Service } from 'typedi';
import { TypeORMConnection } from '../core/data/typeorm/typeorm-connection';
import { createConnection } from 'typeorm';

@Service()
export class Server {
  constructor(
    private typeORMConnection: TypeORMConnection,
  ) {}

  async configure() {
    await this.configureDB();
  }

  start() {
    const typeDefs = fileLoader(path.join(__dirname, "./**/*.graphql"));
    const resolvers = fileLoader(path.join(__dirname, "./**/*.resolvers.*"));

    const server = new GraphQLServer({
      typeDefs,
      resolvers,
    });

    const options: Options = {
      port: process.env.PORT || 4000,
      playground: process.env.PLAYGROUND_ENDPOINT || '/playground',
      endpoint: process.env.YOGA_ENDPOINT || '/graphql',
    }

    server.start(options , () => {
      console.log(`Server is Listening on ${options.port}`);
    });
  }

  private async configureDB() {
    try {
      await createConnection(this.typeORMConnection.getConnectionOptions())
    } catch (error) {
      console.warn(error);
    }
    console.log('Connected to Postgres!')
  }
}