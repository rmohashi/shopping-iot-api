import { Repository, EntityRepository } from "typeorm";
import { LabsoftLightingConsumption } from "../../../entities/labsoft-lighting-consumption";

@EntityRepository(LabsoftLightingConsumption)
export class LabsoftLightingDataSource extends Repository<LabsoftLightingConsumption> {
  get() {
    return this.createQueryBuilder()
      .orderBy("time", "DESC")
      .limit(1)
      .getOne();
  }
}