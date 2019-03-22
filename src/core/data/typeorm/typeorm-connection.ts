import { Service } from 'typedi';
import { ConnectionOptions } from 'typeorm';

@Service()
export class TypeORMConnection {

  getConnectionOptions(): ConnectionOptions {
    return {
      type: 'postgres',
      database: process.env.DB_DATABASE,
      synchronize: true,
      logging: true,
      entities: ["../../../api/entities/**/*.*"],
      host: process.env.DB_ENDPOINT,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD
    };
  }

}