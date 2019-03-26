import { Entity, BaseEntity, PrimaryColumn } from 'typeorm';

@Entity('atual_watts_labsoft')
export class CurrentPowerConsumption extends BaseEntity {
  @PrimaryColumn()
  total: number;
}
