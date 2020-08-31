import { getManager } from 'typeorm';
import { ProjectEntity } from '../entities/ProjectEntity';
import debugLib from 'debug';
import IDesignDef from '../models/IDesignDef';
import { DesignerEntity } from '../entities/DesignerEntity';
import { DesignEntity } from '../entities/DesignEntity';
import { v4 } from 'uuid';
import fs from 'fs';
import { extname } from 'path';
import { classToPlain, plainToClass } from 'class-transformer';
import { debugErrorMsg } from '../utils/ErrorHandler';

const debug = debugLib('dm:DesignService');
const take = 10;
const designDir = './designs';

export const getDesignsForAdmin = async (projectId: string, page: number): Promise<any | undefined> => {
    debug('[NEW] Get Designs for Admin ');

    try {
        const skip = (page - 1) * take;
        const designRepo = getManager().getRepository(DesignEntity);

        const designs = await designRepo.createQueryBuilder('design')
        .select('designer.designer_email', 'designer_email')
        .addSelect('designer.designer_name', 'designer_name')
        .addSelect('designer.designer_last_name', 'designer_last_name')
        .addSelect('design.created_date', 'upload_date')
        .addSelect('status.description','status_description')
        .addSelect('design.original_path', 'original_path')
        .addSelect('design.compressed_path', 'compressed_path')
        .innerJoin('design.designer', 'designer')
        .innerJoin('design.project', 'project')
        .innerJoin('design.status', 'status')
        .where('project.id = :id', { id: projectId })
        .orderBy('design.created_date', 'DESC')
        .offset(skip)
        .limit(take)
        .getRawMany();

        designs.forEach(d=> {
           if(d.status_description === 'Disponible') {
               d.orignal_image = fs.readFileSync(`${designDir}/${d.original_path}`);
               // d.compressed_image = fs.readFileSync(`${designDir}/${d.compressed_path}`);
           }
        });
        return designs;
    } catch (error) {
        debug(debugErrorMsg, error);
        return Promise.reject({ error, message: 'Could not get designs for admin' });
    }
};

export const getDesignsForDesigner = async (projectId: string, page: number): Promise<any | undefined> => {
    debug('[NEW] Get Designs for Designer');

    try {
        const skip = (page - 1) * take;
        const designRepo = getManager().getRepository(DesignEntity);

        const designs = await designRepo.createQueryBuilder('design')
        .select('design.created_date', 'upload_date')
        .addSelect('status.description', 'status_description')
        .addSelect('design.original_path', 'original_path')
        .addSelect('design.compressed_path', 'compressed_path')
        .innerJoin('design.project', 'project')
        .innerJoin('design.status', 'status')
        .where('project.id = :id', { id: projectId })
        .orderBy('design.created_date', 'DESC')
        .offset(skip)
        .limit(take)
        .getRawMany();

        designs.forEach(d=> {
            if(d.status_description === 'Disponible') {
                d.orignal_image = fs.readFileSync(`${designDir}/${d.original_path}`);
                // d.compressed_image = fs.readFileSync(`${designDir}/${d.compressed_path}`);
            }
        });
        return designs;
    } catch (error) {
        debug(debugErrorMsg, error);
        return Promise.reject({ error, message: 'Could not get designs for designer' });
    }
};

export const createDesign = async (design: IDesignDef, file: Express.Multer.File): Promise<any | undefined> => {
    debug('[NEW] Create Design');

    try {
        const projectRepo = getManager().getRepository(ProjectEntity);
        const project = await projectRepo.findOne({id: design.project_id});
        if(project) {
            const designerRepo = getManager().getRepository(DesignerEntity);
            let designer = await designerRepo.findOne({designer_email: design.designer_email});

            if (!designer) {
                debug('[NEW] Create Designer');
                const designerEntity = plainToClass(DesignerEntity, design);
                designer = await designerRepo.save(designerEntity);
            }
            const fileName = uploadFile(file);
            const designRepo = getManager().getRepository(DesignEntity);
            const designEntity = new DesignEntity(
                v4(),
                design.requested_value,
                fileName,
                project,
                designer
            );
            const designCreated = await designRepo.save(designEntity);
            debug('[NEW] Design created');
            return classToPlain(designCreated);
        } else {
            return Promise.reject({ status: 400, message: 'Invalid Project' });
        }
    } catch (error) {
        return Promise.reject({ error, message: 'Could not create design' });
    }
};

const uploadFile = (file: Express.Multer.File): string => {
    const newFileName = `${v4()}${extFrom(file)}`;

    if (!fs.existsSync(designDir)) {
        fs.mkdirSync(designDir);
    }
    fs.writeFileSync(`${designDir}/${newFileName}`, file.buffer);
    return newFileName;
};

const extFrom = (file: Express.Multer.File) => extname(file.originalname).toLowerCase();
