import { PowerConsumptionDataSource } from './power-consumption.datasource';
import { getCustomRepository, Connection } from 'typeorm';

const dataSource = getCustomRepository(PowerConsumptionDataSource);

export default {
  Query: {
    CurrentPowerConsumption: async () => {
      const powerConsumption = await dataSource.get();
      return { measurement: powerConsumption.total};
    }
  }
}
