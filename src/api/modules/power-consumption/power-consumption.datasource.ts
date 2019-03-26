import { EntityRepository, Repository } from "typeorm";
import { CurrentPowerConsumption } from "../../../entities/current-power-consumption";

@EntityRepository(CurrentPowerConsumption)
export class PowerConsumptionDataSource extends Repository<CurrentPowerConsumption> {
  get() {
    return this.createQueryBuilder()
      .getOne();
  }
}
