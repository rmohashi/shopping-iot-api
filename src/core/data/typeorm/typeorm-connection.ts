import { Service } from 'typedi';
import { ConnectionOptions } from 'typeorm';

@Service()
export class TypeORMConnection {

  getConnectionOptions(entitiesPath: string): ConnectionOptions {
    return {
      type: 'postgres',
      database: process.env.DB_DATABASE,
      synchronize: false,
      logging: false,
      entities: [entitiesPath],
      host: process.env.DB_ENDPOINT,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      migrationsRun: false,
    };
  }

}
