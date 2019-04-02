import { getCustomRepository } from "typeorm";
import { LabsoftConsumptionDataSource } from "./labsoft-consumption.datasource";

const dataSource = getCustomRepository(LabsoftConsumptionDataSource);

export default {
  Query: {
    LabsoftLastMonthConsumption: async () => {
      const lastMonthConsumption = await dataSource.getLastMonthConsumption();
      return { 
        measurement: lastMonthConsumption.average * 0.72,
        average: lastMonthConsumption.average / 1000
      };
    },

    LabsoftLastMonthDailyConsumption: async () => {
      const dailyConsumption = await dataSource.getLastMonthDailyConsumption();
      const mappedDailyConsumption = dailyConsumption.map(singleConsumption => ({
        ...singleConsumption,
        day: singleConsumption.day.toISOString(),
      }));
      return { 
        dailyConsumption: mappedDailyConsumption
      };
    },

    LabsoftCurrentMonthBillPreview: async () => {
      const billingPreview = await dataSource.getCurrentMonthBillingPreview();
      return { 
        month: billingPreview.month,
        value: billingPreview.value
      };
    }
  }
}
