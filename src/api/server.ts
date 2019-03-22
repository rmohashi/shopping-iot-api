import { Options, GraphQLServer } from 'graphql-yoga';
import { fileLoader, mergeResolvers, mergeTypes } from 'merge-graphql-schemas';
import * as path from 'path';
import { Service } from 'typedi';
import { TypeORMConnection } from '../core/data/typeorm/typeorm-connection';
import { createConnection, Connection } from 'typeorm';

@Service()
export class Server {
  constructor(
    private typeORMConnection: TypeORMConnection,
  ) {}

  async start() {
    const connection: Connection = await this.configureDB();
    console.log('Connected to Postgres!')

    const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './**/*.graphql')));
    const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './**/*.resolvers.*')));

    const server = new GraphQLServer({
      typeDefs,
      resolvers,
      context: { connection: connection },
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
      const entitiesPath = path.join(__dirname, '../entities/**/*.*')
      return await createConnection(this.typeORMConnection.getConnectionOptions(entitiesPath));
    } catch (error) {
      console.warn(error);
    }
  }
}
