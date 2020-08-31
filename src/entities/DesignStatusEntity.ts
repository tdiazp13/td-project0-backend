import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DesignEntity } from './DesignEntity';

@Entity('DESIGN_STATUS')
export class DesignStatusEntity {
    @PrimaryGeneratedColumn({ name: 'ID', type: 'int' })
    public id!: number;

    @Column({ name: 'DESCRIPTION', type: 'varchar', length: 50 })
    public description!: string;

    @OneToMany(type => DesignEntity, design => design.status)
    designs!: DesignEntity[];
}
