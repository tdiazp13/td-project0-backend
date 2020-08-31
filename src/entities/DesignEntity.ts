import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { DesignStatusEntity } from './DesignStatusEntity';
import { ProjectEntity } from './ProjectEntity';
import { DesignerEntity } from './DesignerEntity';

@Entity('DESIGN')
export class DesignEntity {
    @PrimaryColumn({ name: 'ID', type: 'varchar', length: 45 })
    public id!: string;

    @CreateDateColumn({ name: 'CREATED_DATE', type: 'timestamp' })
    public created_date!: Date;

    @Column ({ name: 'REQUESTED_VALUE', type: 'decimal', precision: 10, scale:2 })
    public requested_value!: number;

    @Column({ name: 'ORIGINAL_PATH', type: 'varchar', length: 200 })
    public original_path!: string;

    @Column({ name: 'COMPRESSED_PATH', type: 'varchar', length: 200 })
    @Exclude()
    public compressed_path!: string;

    @ManyToOne(type => DesignStatusEntity, status => status.designs)
    @JoinColumn([{ name: 'STATUS_ID' }, { name: 'ID' }])
    @Exclude()
    status!: DesignStatusEntity;

    @ManyToOne(type => ProjectEntity, project => project.designs)
    @JoinColumn([{ name: 'PROJECT_ID' }, { name: 'ID' }])
    @Exclude()
    project!: ProjectEntity;

    @ManyToOne(type => DesignerEntity, designer => designer.designs)
    @JoinColumn([{ name: 'DESIGNER_ID' }, { name: 'ID' }])
    @Exclude()
    designer!: DesignerEntity;


    constructor(id: string, requested_value: number, original_path: string, project: ProjectEntity, designer: DesignerEntity) {
        this.id = id;
        this.requested_value = requested_value;
        this.original_path = original_path;
        this.project = project;
        this.designer = designer;
    }
}
