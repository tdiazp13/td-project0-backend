import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('USER')
export class User {
    @PrimaryGeneratedColumn({ name: 'ID', type: 'int' })
    @Exclude()
    public id!: number;
    @Column({ name: 'USERNAME', type: 'varchar', length: 45 })
    public username!: string;
    @Column({ name: 'FIRST_NAME', type: 'varchar', length: 45 })
    public first_name!: string;
    @Column({ name: 'LAST_NAME', type: 'varchar', length: 45 })
    public last_name!: string;
    @Column({ name: 'EMAIL', type: 'varchar', length: 45 })
    public email!: string;
    @Column({ name: 'PASSWORD', type: 'varchar', length: 100 })
    @Exclude()
    public password!: string;
}
