import { Request, Response, Router } from 'express';
import {
    createEvent,
    updateEvent,
    deleteEvent,
    getEventById,
    getEventCategories,
    getEvents,
    getEventType
} from '../services/EventService';
import HTTP_STATUS_CODES from 'http-status';
import { ErrorHandler } from '../utils/ErrorHandler';
import { ensureAuthenticated } from '../utils/Middleware';
import { IAuthRequest } from '../models/IAuthRequest';

const router = Router();

/**
 * Controlador para Manejo de los eventos
 * @author Tania Díaz
 * @version 1.0
 */

router.post('/api/events', ensureAuthenticated, async (req: IAuthRequest, res: Response) => {
    try {
        const event = await createEvent(req.body, req.user||0);
        if (!event) {
            res.status(HTTP_STATUS_CODES.NOT_FOUND);
        } else {
            res.status(HTTP_STATUS_CODES.CREATED);
        }
        res.send(event || {});

    } catch (error) {
        const statusCode = error.status || HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;
        const errorMsg = ErrorHandler.getErrorResponse(error.message, 'ERROR_CREATING_EVENT', statusCode);
        res.status(statusCode).send(errorMsg);
    }
});

router.put('/api/events/:eventId', ensureAuthenticated, async (req: Request, res: Response) => {
    try {
        const event = await updateEvent(req.params.eventId, req.body);
        if (!event || !event.length) {
            res.status(HTTP_STATUS_CODES.NOT_FOUND);
        } else {
            res.status(HTTP_STATUS_CODES.ACCEPTED);
        }
        res.send(event || {});
    } catch (error) {
        const statusCode = error.status || HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;
        const errorMsg = ErrorHandler.getErrorResponse(error.message, 'ERROR_UPDATING_EVENTS', statusCode);
        res.status(statusCode).send(errorMsg);
    }
});

router.get('/api/events/', ensureAuthenticated, async (req: IAuthRequest, res: Response) => {
        try {
            const events = await getEvents(req.user||0);
            if (!events || !events.length) {
                res.status(HTTP_STATUS_CODES.NOT_FOUND);
            } else {
                res.status(HTTP_STATUS_CODES.OK);
            }
            res.send(events || []);
        } catch (error) {
            const statusCode = error.status || HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;
            const errorMsg = ErrorHandler.getErrorResponse(error.message, 'ERROR_GETTING_EVENTS', statusCode);
            res.status(statusCode).send(errorMsg);
        }
    }
);


router.get('/api/events/:eventId', ensureAuthenticated, async (req: Request, res: Response) => {
        try {
            const events = await getEventById(req.params.eventId);
            if (!events) {
                res.status(HTTP_STATUS_CODES.NOT_FOUND);
            } else {
                res.status(HTTP_STATUS_CODES.OK);
            }
            res.send(events || []);
        } catch (error) {
            const statusCode = error.status || HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;
            const errorMsg = ErrorHandler.getErrorResponse(error.message, 'ERROR_GETTING_EVENT', statusCode);
            res.status(statusCode).send(errorMsg);
        }
    }
);

router.delete('/api/events/:eventId', ensureAuthenticated, async (req: Request, res: Response) => {
        try {
            const events = await deleteEvent(req.params.eventId);
            if (!events) {
                res.status(HTTP_STATUS_CODES.NOT_FOUND);
            } else {
                res.status(HTTP_STATUS_CODES.OK);
            }
            res.send(events || []);
        } catch (error) {
            const statusCode = error.status || HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;
            const errorMsg = ErrorHandler.getErrorResponse(error.message, 'ERROR_DELETING_EVENT', statusCode);
            res.status(statusCode).send(errorMsg);
        }
    }
);

router.get('/api/event/categories', ensureAuthenticated, async (_req: Request, res: Response) => {
        try {
            const categories = await getEventCategories();
            if (!categories || !categories.length) {
                res.status(HTTP_STATUS_CODES.NOT_FOUND);
            } else {
                res.status(HTTP_STATUS_CODES.OK);
            }
            res.send(categories || []);
        } catch (error) {
            const statusCode = error.status || HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;
            const errorMsg = ErrorHandler.getErrorResponse(error.message, 'ERROR_GETTING_EVENT_CATEGORIES', statusCode);
            res.status(statusCode).send(errorMsg);
        }
    }
);

router.get('/api/event/types', ensureAuthenticated, async (_req: Request, res: Response) => {
        try {
            const eventType = await getEventType();
            if (!eventType || !eventType.length) {
                res.status(HTTP_STATUS_CODES.NOT_FOUND);
            } else {
                res.status(HTTP_STATUS_CODES.OK);
            }
            res.send(eventType || []);
        } catch (error) {
            const statusCode = error.status || HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;
            const errorMsg = ErrorHandler.getErrorResponse(error.message, 'ERROR_GETTING_EVENT_TYPES', statusCode);
            res.status(statusCode).send(errorMsg);
        }
    }
);

export default router;
