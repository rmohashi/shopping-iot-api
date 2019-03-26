import { PowerConsumptionDataSource } from './power-consumption.datasource';
import { getCustomRepository, Connection } from 'typeorm';

const dataSource = getCustomRepository(PowerConsumptionDataSource);

export default {
  Query: {
    CurrentPowerConsumption: async (_parent, _args, context: { connection: Connection }) => {
      const powerConsumption = await dataSource.get();
      return { measurement: powerConsumption.total};
    }
  }
}
