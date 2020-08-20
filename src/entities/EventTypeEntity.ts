import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('EVENT_TYPE')
export class EventType {
    @PrimaryGeneratedColumn({ name: 'ID', type: 'int' })
    public id!: number;
    @Column({ name: 'DESCRIPTION', type: 'varchar', length: 45 })
    public description!: string;
}
