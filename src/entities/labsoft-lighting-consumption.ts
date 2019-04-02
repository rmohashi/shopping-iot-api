import { Entity, BaseEntity, PrimaryColumn, Column } from 'typeorm';

@Entity('consumo_watts_iluminacao_labsoft')
export class LabsoftLightingConsumption extends BaseEntity {
  @PrimaryColumn()
  time: Date;

  @Column({ name: 'valor' })
	value: number;
}
