import { Repository, EntityRepository } from "typeorm";
import { LabsoftWorkbenchesConsumption } from "../../../entities/labsoft-workbenches-consumption";

@EntityRepository(LabsoftWorkbenchesConsumption)
export class LabsoftWorkbenchesDataSource extends Repository<LabsoftWorkbenchesConsumption> {
  get() {
    return this.createQueryBuilder()
      .orderBy("time", "DESC")
      .limit(1)
      .getOne();
  }
}