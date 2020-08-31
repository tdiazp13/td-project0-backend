import { Request, Response, Router } from 'express';
import { ensureAuthenticated } from '../utils/Middleware';
import { IAuthRequest } from '../models/IAuthRequest';
import HTTP_STATUS_CODES from 'http-status';
import { ErrorHandler } from '../utils/ErrorHandler';
import {
    createProject,
    deleteProject,
    getProjectById,
    getProjectsByToken, getProjectsByUrl,
    updateProject
} from '../services/ProjectService';

const router = Router();

/**
 * Controller for Projects
 * @version 1.0
 */

/**
 * Method to get all project of company being authenticated
 */
router.get('/api/projects/', ensureAuthenticated, async (req: IAuthRequest, res: Response) => {
        try {
            const project = await getProjectsByToken(req.company||0);
            if (!project || !project.length) {
                res.status(HTTP_STATUS_CODES.NOT_FOUND);
            } else {
                res.status(HTTP_STATUS_CODES.OK);
            }
            res.send(project || []);
        } catch (error) {
            const statusCode = error.status || HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;
            const errorMsg = ErrorHandler.getErrorResponse(error.message, 'ERROR_GETTING_PROJECTS', statusCode);
            res.status(statusCode).send(errorMsg);
        }
    }
);

/**
 * Method to get all project of company through the url
 */
router.get('/api/company/:url/projects', async (req: Request, res: Response) => {
        try {
            const project = await getProjectsByUrl(req.params.url);
            if (!project || !project.length) {
                res.status(HTTP_STATUS_CODES.NOT_FOUND);
            } else {
                res.status(HTTP_STATUS_CODES.OK);
            }
            res.send(project || []);
        } catch (error) {
            const statusCode = error.status || HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;
            const errorMsg = ErrorHandler.getErrorResponse(error.message, 'ERROR_GETTING_PROJECTS', statusCode);
            res.status(statusCode).send(errorMsg);
        }
    }
);

/**
 * Method to created a new project
 */
router.post('/api/projects', ensureAuthenticated, async (req: IAuthRequest, res: Response) => {
    try {
        const project = await createProject(req.body, req.company||0);
        if (!project) {
            res.status(HTTP_STATUS_CODES.NOT_FOUND);
        } else {
            res.status(HTTP_STATUS_CODES.CREATED);
        }
        res.send(project || {});

    } catch (error) {
        const statusCode = error.status || HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;
        const errorMsg = ErrorHandler.getErrorResponse(error.message, 'ERROR_CREATING_EVENT', statusCode);
        res.status(statusCode).send(errorMsg);
    }
});

/**
 * Method to delete a project
 */
router.delete('/api/projects/:projectId', ensureAuthenticated, async (req: Request, res: Response) => {
        try {
            const project = await deleteProject(req.params.projectId);
            if (!project) {
                res.status(HTTP_STATUS_CODES.NOT_FOUND);
            } else {
                res.status(HTTP_STATUS_CODES.OK);
            }
            res.send(project || []);
        } catch (error) {
            const statusCode = error.status || HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;
            const errorMsg = ErrorHandler.getErrorResponse(error.message, 'ERROR_DELETING_PROJECT', statusCode);
            res.status(statusCode).send(errorMsg);
        }
    }
);

/**
 * Method to update a project
 */
router.put('/api/projects/:projectId', ensureAuthenticated, async (req: Request, res: Response) => {
    try {
        const project = await updateProject(req.params.projectId, req.body);
        if (!project) {
            res.status(HTTP_STATUS_CODES.NOT_FOUND);
        } else {
            res.status(HTTP_STATUS_CODES.ACCEPTED);
        }
        res.send(project || {});
    } catch (error) {
        const statusCode = error.status || HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;
        const errorMsg = ErrorHandler.getErrorResponse(error.message, 'ERROR_UPDATING_PROJECT', statusCode);
        res.status(statusCode).send(errorMsg);
    }
});

/**
 * Method to get an specific project
 */
router.get('/api/projects/:projectId', ensureAuthenticated, async (req: Request, res: Response) => {
        try {
            const project = await getProjectById(req.params.projectId);
            if (!project) {
                res.status(HTTP_STATUS_CODES.NOT_FOUND);
            } else {
                res.status(HTTP_STATUS_CODES.OK);
            }
            res.send(project || []);
        } catch (error) {
            const statusCode = error.status || HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;
            const errorMsg = ErrorHandler.getErrorResponse(error.message, 'ERROR_GETTING_PROJECT', statusCode);
            res.status(statusCode).send(errorMsg);
        }
    }
);

export default router;
