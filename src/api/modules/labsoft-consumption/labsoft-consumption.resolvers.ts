import { getCustomRepository } from "typeorm";
import { LabsoftConsumptionDataSource } from "./labsoft-consumption.datasource";

const dateSource = getCustomRepository(LabsoftConsumptionDataSource);

export default {
  Query: {
    LabsoftLastMonthConsumption: async () => {
      const lastMonthConsumption = await dateSource.getLastMonthConsumption();
      return { measurement: lastMonthConsumption.total };
    }
  }
}
