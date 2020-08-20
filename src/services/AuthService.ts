import debugLib from 'debug';
import ILoginDef from '../models/ILoginDef';
import jwt from 'jsonwebtoken';
import config from '../config';
import bcrypt from 'bcrypt';
import { getBDConnection } from '../utils/Comms';
import { User } from '../entities/UserEntity';
import { debugErrorMsg } from '../utils/ErrorHandler';
import { plainToClass } from 'class-transformer';
import IUserDef from '../models/IUserDef';

const debug = debugLib('td:AuthService');

export const createUser = async (user: IUserDef): Promise<any | undefined> => {
    debug('[NEW] Create User');
    const conn = await getBDConnection();

    try {
        user.password = bcrypt.hashSync(user.password, 10);

        const userRepo = conn.getRepository(User);
        const existingUser = await userRepo.findOne({where: [{username: user.username} , {email: user.email}]});

        if (existingUser) {
            debug('[NEW] User already exists');
            return Promise.reject({ status: 400, message: 'Invalid User' });
        } else {
            const userSaved = await userRepo.save(user);
            debug('[NEW] User created');
            return plainToClass(User, userSaved);
        }
    } catch (error) {
        return Promise.reject({ error, message: 'Could not create user' });
    } finally {
        await conn.close();
    }
};

export const validateLogin = async (login: ILoginDef): Promise<string | undefined> => {
    debug('[NEW] Login request');
    const conn = await getBDConnection();

    try {
        const userRepo = conn.getRepository(User);
        const user = await userRepo.findOne({email: login.email});

        if(user) {
            if (bcrypt.compareSync(login.password, user.password)) {
                const tokenBody = {userId: user.id};
                return jwt.sign(tokenBody, config.JWT, {expiresIn: '1d'});
            } else {
                return Promise.reject({ status: 400, message: 'Invalid Credentials' });
            }
        } else {
            return Promise.reject({ status: 400, message: 'Invalid User' });
        }
    } catch (error) {
        debug(debugErrorMsg, error);
        return Promise.reject({ error, message: 'Could not validate login' });
    } finally {
        await conn.close();
    }
};
