import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { ProjectEntity } from './ProjectEntity';

@Entity('COMPANY')
export class CompanyEntity {
    @PrimaryGeneratedColumn({ name: 'ID', type: 'int' })
    @Exclude()
    public id!: number;

    @Column({ name: 'NAME', type: 'varchar', length: 300 })
    public company_name!: string;

    @Column({ name: 'ADMIN_EMAIL', type: 'varchar', length: 100 })
    public admin_email!: string;

    @Column({ name: 'ADMIN_PASSWORD', type: 'varchar', length: 100 })
    @Exclude()
    public admin_password!: string;

    @Column({ name: 'URL', type: 'varchar', length: 500 })
    public url!: string;

    @OneToMany(type => ProjectEntity, project => project.company)
    projects!: ProjectEntity[];
}
