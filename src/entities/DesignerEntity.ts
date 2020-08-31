import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DesignEntity } from './DesignEntity';

@Entity('DESIGNER')
export class DesignerEntity {
    @PrimaryGeneratedColumn({ name: 'ID', type: 'int' })
    public id!: number;

    @Column({ name: 'EMAIL', type: 'varchar', length: 50 })
    public designer_email!: string;

    @Column({ name: 'NAME', type: 'varchar', length: 100 })
    public designer_name!: string;

    @Column({ name: 'LAST_NAME', type: 'varchar', length: 100 })
    public designer_last_name!: string;

    @OneToMany(type => DesignEntity, design => design.designer)
    designs!: DesignEntity[];
}
