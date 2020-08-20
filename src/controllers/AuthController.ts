import { Request, Response, Router } from 'express';
import { createUser, validateLogin } from '../services/AuthService';
import HTTP_STATUS_CODES from 'http-status';
import { ErrorHandler } from '../utils/ErrorHandler';

const router = Router();

/**
 * Controlador para Autenticación
 * @author Tania Díaz
 * @version 1.0
 */

router.post('/api/create-user', async (req: Request, res: Response) => {
    try {
        const user = await createUser(req.body);
        if (!user || !user.length) {
            res.status(HTTP_STATUS_CODES.NOT_FOUND);
        } else {
            res.status(HTTP_STATUS_CODES.OK);
        }
        res.status(201).send(user || {});
    } catch (error) {
        const statusCode = error.status || HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;
        const errorMsg = ErrorHandler.getErrorResponse(error.message, 'ERROR_CREATING_USER', statusCode);
        res.status(statusCode).send(errorMsg);
    }
});

router.post('/api/api-auth', async (req: Request, res: Response) => {
    try {
        const accessToken = await validateLogin(req.body);
        res.status(200).send({ token: accessToken});
    } catch (error) {
        const statusCode = error.status || HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;
        const errorMsg = ErrorHandler.getErrorResponse(error.message, 'ERROR_VALIDATING_LOGIN', statusCode);
        res.status(statusCode).send(errorMsg);
    }
});

export default router;
