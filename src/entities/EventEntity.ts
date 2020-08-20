import { Column, Entity, PrimaryColumn, CreateDateColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('EVENT')
export class Event {
    @PrimaryColumn({ name: 'ID', type: 'varchar', length: 45 })
    public id!: string;
    @Column({ name: 'USER_ID', type: 'int' })
    @Exclude()
    public user_id!: number;
    @Column({ name: 'NAME', type: 'varchar', length: 200 })
    public event_name!: string;
    @Column({ name: 'CATEGORY_ID', type: 'int'})
    public event_category!: number;
    @Column({ name: 'PLACE', type: 'varchar', length: 200 })
    public event_place!: string;
    @Column({ name: 'ADDRESS', type: 'varchar', length: 200 })
    public event_address!: string;
    @Column({ name: 'INITIAL_DATE', type: 'timestamp'})
    public event_initial_date!: Date;
    @Column({ name: 'END_DATE', type: 'timestamp' })
    public event_final_date!: Date;
    @Column({ name: 'TYPE_ID', type: 'int' })
    public event_type!: number;
    @CreateDateColumn({ name: 'CREATED_DATE', type: 'timestamp' })
    @Exclude()
    public created_date!: Date;
}
