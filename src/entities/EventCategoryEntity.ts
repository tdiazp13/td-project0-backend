import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('EVENT_CATEGORY')
export class EventCategory {
    @PrimaryGeneratedColumn({ name: 'ID', type: 'int' })
    public id!: number;
    @Column({ name: 'DESCRIPTION', type: 'varchar', length: 45 })
    public description!: string;
}
