import { Entity, BaseEntity, PrimaryColumn, Column } from 'typeorm';

@Entity('consumo_watts_labsoft')
export class LabsoftConsumption extends BaseEntity {
  @PrimaryColumn()
  time: Date;

  @Column({ name: 'consumo_total' })
  total: number;
}
