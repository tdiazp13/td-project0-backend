import { Request, Response, Router } from 'express';
import { createCompany, validateLogin } from '../services/AuthService';
import HTTP_STATUS_CODES from 'http-status';
import { ErrorHandler } from '../utils/ErrorHandler';

const router = Router();

/**
 * Controller for Authentication
 * @version 1.0
 */

/**
 * Method to create new company and register admin
 */
router.post('/api/create-company', async (req: Request, res: Response) => {
    try {
        const company = await createCompany(req.body);
        if (!company) {
            res.status(HTTP_STATUS_CODES.NOT_FOUND);
        } else {
            res.status(HTTP_STATUS_CODES.CREATED);
        }
        res.send(company || {});
    } catch (error) {
        const statusCode = error.status || HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;
        const errorMsg = ErrorHandler.getErrorResponse(error.message, 'ERROR_CREATING_COMPANY', statusCode);
        res.status(statusCode).send(errorMsg);
    }
});

/**
 * Method to authenticate admin
 */
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
