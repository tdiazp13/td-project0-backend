import debugLib from 'debug';
import { getManager } from 'typeorm';
import { classToPlain, plainToClass } from 'class-transformer';
import { debugErrorMsg } from '../utils/ErrorHandler';
import IProjectDef from '../models/IProjectDef';
import { CompanyEntity } from '../entities/CompanyEntity';
import { ProjectEntity } from '../entities/ProjectEntity';
import { v4 } from 'uuid';

const debug = debugLib('dm:ProjectService');

export const getProjectsByToken = async (companyId: number): Promise<any | undefined> => {
    debug('[NEW] Get Projects for Admin');
    return getProjectsByCompany(companyId);
};

export const getProjectsByUrl = async (url: string): Promise<any | undefined> => {
    debug('[NEW] Get Projects for Designer');
    const companyRepo = getManager().getRepository(CompanyEntity);
    const company = await companyRepo.findOne({url});

    if(company) {
        return getProjectsByCompany(company.id);
    } else {
        return Promise.reject({ status: 400, message: 'Invalid Url' });
    }
};

const getProjectsByCompany = async (companyId: number) => {
    try {
        const companyRepo = getManager().getRepository(CompanyEntity);
        const company = await companyRepo.createQueryBuilder('cp')
        .leftJoinAndSelect('cp.projects', 'pr',  'pr.active = 1')
        .where('cp.id = :id', { id: companyId })
        .getOne();
        return classToPlain(company);
    } catch (error) {
        debug(debugErrorMsg, error);
        return Promise.reject({ error, message: 'Could not get projects' });
    }
};

export const createProject = async (projectRq: IProjectDef, companyId: number): Promise<any | undefined> => {
    debug('[NEW] Create Project');

    try {
        const companyRepo = getManager().getRepository(CompanyEntity);
        const existingCompany = await companyRepo.findOne({id: companyId});

        if (existingCompany) {
            const projectClass = plainToClass(ProjectEntity, projectRq);
            projectClass.id = v4();
            projectClass.company = existingCompany;
            const projectRepo = getManager().getRepository(ProjectEntity);
            const projectSaved = await projectRepo.save(projectClass);
            debug('[NEW] Project created');
            return classToPlain(projectSaved);
        } else {
            return Promise.reject({ status: 400, message: 'Invalid Company' });
        }
    } catch (error) {
        debug(debugErrorMsg, error);
        return Promise.reject({ error, message: 'Could not create Project' });
    }
};

export const updateProject = async (projectId: string, payload: IProjectDef): Promise<any | undefined> => {
    debug('[NEW] Update project');

    try {
        const projectRepo = getManager().getRepository(ProjectEntity);
        const existingProject = await projectRepo.findOne({id: projectId});

        if (existingProject) {
            existingProject.paying_value = payload.paying_value;
            existingProject.project_desc = payload.project_desc;
            existingProject.project_name = payload.project_name;
            const eventSaved = await projectRepo.save(existingProject);
            return classToPlain(eventSaved);
        } else {
            return Promise.reject({ status: 400, message: 'Invalid Project' });
        }
    } catch (error) {
        debug(debugErrorMsg, error);
        return Promise.reject({ error, message: 'Could not update Project' });
    }
};

export const deleteProject= async (projectId: string): Promise<any | undefined> => {
    debug('[NEW] Delete Event');

    try {
        const projectRepo = getManager().getRepository(ProjectEntity);
        const project = await projectRepo.findOne({id: projectId});

        if (project) {
            project.active = 0;
            const projectSaved = await projectRepo.save(project);
            debug('[NEW] Project disabled');
            return classToPlain(projectSaved);
        } else {
            return Promise.reject({ status: 400, message: 'Invalid Project' });
        }
    } catch (error) {
        debug(debugErrorMsg, error);
        return Promise.reject({ error, message: 'Could not delete Project' });
    }
};

export const getProjectById = async (projectId: string): Promise<any | undefined> => {
    debug('[NEW] Project by Id query');

    try {
        const projectRepo = getManager().getRepository(ProjectEntity);
        const project = await projectRepo.findOne({id: projectId});
        return classToPlain(project);
    } catch (error) {
        debug(debugErrorMsg, error);
        return Promise.reject({ error, message: 'Could not get project by id' });
    }
};
