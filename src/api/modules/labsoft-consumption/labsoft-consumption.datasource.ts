import { Repository, EntityRepository } from "typeorm";
import { subDays } from "date-fns";

import { LabsoftConsumption } from "../../../entities/labsoft-consumption";

@EntityRepository(LabsoftConsumption)
export class LabsoftConsumptionDataSource extends Repository<LabsoftConsumption> {
  getLastMonthConsumption() {
    const endDate = new Date();
    const startDate = subDays(endDate, 30);
    return this.createQueryBuilder().select("AVG(consumo_total) * 0.72", "total")
      .where("time >= :startDate", { startDate })
      .andWhere("time <= :endDate", { endDate })
      .getRawOne();
  }
}
