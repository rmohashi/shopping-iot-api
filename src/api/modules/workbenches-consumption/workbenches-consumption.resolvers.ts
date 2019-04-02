import { getCustomRepository } from "typeorm";
import { LabsoftWorkbenchesDataSource } from "./workbenches-consumption.datasource";

const dataSource = getCustomRepository(LabsoftWorkbenchesDataSource);

export default {
  Query: {
    LabsoftWorkbenchesPowerConsumption: async () => {
      const powerConsumption = await dataSource.get();
      return { measurement: powerConsumption.value };
    }
  }
}