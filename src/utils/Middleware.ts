import jwt from 'jsonwebtoken';
import config from '../config';
import { Response, NextFunction } from 'express';
import { IAuthRequest } from '../models/IAuthRequest';

const ensureAuthenticated = (req: IAuthRequest, res: Response, next: NextFunction) => {

    const authHeader = req.headers.authorization;
    if (!authHeader) {
       return res.status(401).send({message: 'Your request does not have an authorization header'});
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).send({message: 'Your request does not have a token'});
    }

    try {
        const user = jwt.verify(token, config.JWT);
        req.user = (user as {userId:number}).userId;
        next();
    } catch(err) {
        return res.status(403).send({message: 'Invalid Token'});
    }
};

export { ensureAuthenticated };
