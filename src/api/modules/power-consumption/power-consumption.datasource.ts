import { EntityRepository, Repository } from "typeorm";
import { PowerConsumption } from "../../../entities/power-consumption";

@EntityRepository(PowerConsumption)
export class PowerConsumptionDataSource extends Repository<PowerConsumption> {
  get() {
    return this.createQueryBuilder()
      .getOne();
  }
}
