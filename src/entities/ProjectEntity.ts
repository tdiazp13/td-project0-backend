import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn} from 'typeorm';
import { Exclude } from 'class-transformer';
import  { DesignEntity } from './DesignEntity';
import { CompanyEntity } from './CompanyEntity';

@Entity('PROJECT')
export class ProjectEntity {
    @PrimaryColumn({ name: 'ID', type: 'varchar', length: 45 })
    public id!: string;

    @Column({ name: 'NAME', type: 'varchar', length: 200 })
    public project_name!: string;

    @Column({ name: 'DESCRIPTION', type: 'varchar', length: 400 })
    public project_desc!: string;

    @Column({ name: 'PAYING_VALUE', type: 'decimal', precision:10, scale:2 })
    public paying_value!: number;

    @Column({ name: 'ACTIVE', type: 'tinyint'})
    @Exclude()
    public active!: number;

    @OneToMany(type => DesignEntity, design => design.project)
    designs!: DesignEntity[];

    @ManyToOne(type => CompanyEntity, company => company.projects)
    @JoinColumn([{ name: 'COMPANY_ID' }, { name: 'ID' }])
    @Exclude()
    company!: CompanyEntity;
}
