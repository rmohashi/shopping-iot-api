import { getCustomRepository } from "typeorm";
import { LabsoftConsumptionDataSource } from "./labsoft-consumption.datasource";

const dataSource = getCustomRepository(LabsoftConsumptionDataSource);

export default {
  Query: {
    LabsoftLastMonthConsumption: async () => {
      const lastMonthConsumption = await dataSource.getLastMonthConsumption();
      return { measurement: lastMonthConsumption.total };
    }
  }
}
