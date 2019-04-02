import { Entity, BaseEntity, PrimaryColumn, Column } from 'typeorm';

@Entity('consumo_watts_bancadas_labsoft')
export class LabsoftWorkbenchesConsumption extends BaseEntity {
  @PrimaryColumn()
  time: Date;

  @Column({ name: 'valor' })
  value: number;
}
