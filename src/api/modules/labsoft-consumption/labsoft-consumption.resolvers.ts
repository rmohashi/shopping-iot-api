import { getCustomRepository } from "typeorm";
import { format, addDays } from "date-fns";
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
      let dailyConsumption = await dataSource.getLastMonthDailyConsumption();
      dailyConsumption.reverse();
      const labels = dailyConsumption.reduce((newArray, singleConsumption) => {
        newArray.push(format(addDays(singleConsumption.day, 1), "DD"));
        return newArray;
      }, []);
      const peaks = dailyConsumption.reduce((newArray, singleConsumption) => {
        newArray.push(singleConsumption.peak);
        return newArray;
      }, []);
      const averages = dailyConsumption.reduce((newArray, singleConsumption) => {
        newArray.push(singleConsumption.average);
        return newArray;
      }, []);

      const averageConsumption = {
        labels: labels,
        series: averages
      }
      const peakConsumption = {
        labels: labels,
        series: peaks
      }

      return {
        averageConsumption: averageConsumption,
        peakConsumption: peakConsumption
      };
    },

    LabsoftCurrentMonthBillPreview: async () => {
      const billingPreview = await dataSource.getCurrentMonthBillingPreview();
      return {
        month: billingPreview.month,
        value: billingPreview.value
      };
    },

    LabsoftMonthConsumption: async() => {
      const monthConsumption = await dataSource.getMonthConsumption();
      const monthsName = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho",
                          "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

      return monthConsumption.map(singleConsumption => { 
        return {
          month: monthsName[+format(singleConsumption.month, "M") - 1],
          average: singleConsumption.average
        }
      });
    }
  }
}
