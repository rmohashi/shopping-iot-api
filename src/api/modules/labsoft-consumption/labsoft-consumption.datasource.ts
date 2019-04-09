import { Repository, EntityRepository } from "typeorm";
import { subDays } from "date-fns";

import { LabsoftConsumption } from "../../../entities/labsoft-consumption";

@EntityRepository(LabsoftConsumption)
export class LabsoftConsumptionDataSource extends Repository<LabsoftConsumption> {
  getLastMonthConsumption() {
    const endDate = new Date();
    const startDate = subDays(endDate, 30);
    return this.createQueryBuilder().select("AVG(consumo_total)", "average")
      .where("time >= :startDate", { startDate })
      .andWhere("time <= :endDate", { endDate })
      .getRawOne();
  }

  getLastMonthDailyConsumption() {
    return this.createQueryBuilder().select("time_bucket('1 day', time)", "day")
      .addSelect("AVG(consumo_total) * 24 / 1000", "average")
      .addSelect("(MAX(consumo_total) / 1000::numeric)::double precision", "peak")
      .groupBy("day")
      .orderBy("day", "DESC")
      .limit(30)
      .getRawMany();
  }

  getMonthConsumption() {
    return this.createQueryBuilder().select("time_bucket('30 days', time)", "month")
      .addSelect("AVG(consumo_total)", "average")
      .groupBy("month")
      .orderBy("month", "DESC")
      .getRawMany();
  }

  getCurrentMonthBillingPreview() {
    return this.createQueryBuilder().select("EXTRACT(month from time)", "month")
      .addSelect("AVG(consumo_total) * 0.354", "value")
      .groupBy("month")
      .orderBy("month", "DESC")
      .getRawOne();
  }
}
