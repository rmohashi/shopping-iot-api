import { getCustomRepository } from "typeorm";
import { LabsoftLightingDataSource } from "./lighting-consumption.datasource";

const dataSource = getCustomRepository(LabsoftLightingDataSource);

export default {
  Query: {
    LabsoftLightingCurrentConsumption: async () => {
      const powerConsumption = await dataSource.get();
      return { measurement: powerConsumption.value };
    }
  }
}