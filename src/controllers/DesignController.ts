import { Request, Response, Router } from 'express';
import HTTP_STATUS_CODES from 'http-status';
import { ErrorHandler } from '../utils/ErrorHandler';
import { createDesign, getDesignsForAdmin, getDesignsForDesigner } from '../services/DesignService';
import { ensureAuthenticated } from '../utils/Middleware';

const router = Router();

/**
 * Controller for Designs
 * @version 1.0
 */

/**
 * Method to get designs from project for admin
 */
router.get('/api/projects/:projectId/designs', ensureAuthenticated, async (req: Request, res: Response) => {
        try {
            const page = +(req.query.page as string ) || 1;
            const designs = await getDesignsForAdmin(req.params.projectId, page);
            if (!designs || !designs.length) {
                res.status(HTTP_STATUS_CODES.NOT_FOUND);
            } else {
                res.status(HTTP_STATUS_CODES.OK);
            }
            res.send(designs || []);
        } catch (error) {
            const statusCode = error.status || HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;
            const errorMsg = ErrorHandler.getErrorResponse(error.message, 'ERROR_GETTING_DESIGNS', statusCode);
            res.status(statusCode).send(errorMsg);
        }
    }
);

/**
 * Method to get designs from project for designer
 */
router.get('/api/designer/projects/:projectId/designs', async (req: Request, res: Response) => {
        try {
            const page = +(req.query.page as string ) || 1;
            const designs = await getDesignsForDesigner(req.params.projectId, page);
            if (!designs || !designs.length) {
                res.status(HTTP_STATUS_CODES.NOT_FOUND);
            } else {
                res.status(HTTP_STATUS_CODES.OK);
            }
            res.send(designs || []);
        } catch (error) {
            const statusCode = error.status || HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;
            const errorMsg = ErrorHandler.getErrorResponse(error.message, 'ERROR_GETTING_DESIGNS', statusCode);
            res.status(statusCode).send(errorMsg);
        }
    }
);

/**
 * Method for creating a new design
 */
router.post('/api/designer/designs', async (req: Request, res: Response) => {
    try {
        const design = await createDesign(req.body, (req.files as Express.Multer.File[])[0]);
        if (!design) {
            res.status(HTTP_STATUS_CODES.NOT_FOUND);
        } else {
            res.status(HTTP_STATUS_CODES.CREATED);
        }
        res.send(design || {});
    } catch (error) {
        const statusCode = error.status || HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;
        const errorMsg = ErrorHandler.getErrorResponse(error.message, 'ERROR_CREATING_DESIGN', statusCode);
        res.status(statusCode).send(errorMsg);
    }
});

export default router;
