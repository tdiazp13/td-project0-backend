import debugLib from 'debug';
import ILoginDef from '../models/ILoginDef';
import jwt from 'jsonwebtoken';
import config from '../config';
import bcrypt from 'bcrypt';
import { debugErrorMsg } from '../utils/ErrorHandler';
import { plainToClass } from 'class-transformer';
import { getManager } from 'typeorm';
import { CompanyEntity } from '../entities/CompanyEntity';
import ICompanyDef from '../models/ICompanyDef';

const debug = debugLib('dm:AuthService');

export const createCompany = async (company: ICompanyDef): Promise<any | undefined> => {
    debug('[NEW] Create Company');

    try {
        company.admin_password = bcrypt.hashSync(company.admin_password, 10);

        const companyRepo = getManager().getRepository(CompanyEntity);
        const existingAdmin= await companyRepo.findOne({admin_email: company.admin_email});

        if (existingAdmin) {
            debug('[NEW] Admin already exists');
            return Promise.reject({ status: 400, message: 'Invalid Admin' });
        } else {
            const companySaved = await companyRepo.save(company);
            companySaved.url = `${ company.company_name.replace(/\s+/g,'') }-${ companySaved.id }`;

            const companyUpdated = await companyRepo.save(companySaved);
            // const companyUpdated = await companyRepo.update(companySaved.id, { url: url});
            debug('[NEW] Company created');
            return plainToClass(CompanyEntity, companyUpdated);
        }
    } catch (error) {
        return Promise.reject({ error, message: 'Could not create Company' });
    }
};

export const validateLogin = async (login: ILoginDef): Promise<string | undefined> => {
    debug('[NEW] Login request');

    try {
        const companyRepo = getManager().getRepository(CompanyEntity);
        const company = await companyRepo.findOne({admin_email: login.email});

        if(company) {
            if (bcrypt.compareSync(login.password, company.admin_password)) {
                const tokenBody = {companyId: company.id};
                return jwt.sign(tokenBody, config.JWT, {expiresIn: '1d'});
            } else {
                return Promise.reject({ status: 400, message: 'Invalid Credentials' });
            }
        } else {
            return Promise.reject({ status: 400, message: 'Invalid Admin' });
        }
    } catch (error) {
        debug(debugErrorMsg, error);
        return Promise.reject({ error, message: 'Could not validate login' });
    }
};
