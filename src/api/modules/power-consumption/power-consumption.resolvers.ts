import { PowerConsumptionDataSource } from './power-consumption.datasource';
import { Connection } from 'typeorm';

export default {
  Query: {
    CurrentPowerConsumption: async (_parent, _args, context: { connection: Connection }) => {
      const dataSource = context.connection.getCustomRepository(PowerConsumptionDataSource);
      const powerConsumption = await dataSource.get();
      return { measurement: powerConsumption.total};
    }
  }
}
