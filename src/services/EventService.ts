import debugLib from 'debug';
import { debugErrorMsg } from '../utils/ErrorHandler';
import IEventDef from '../models/IEventDef';
import { EventCategory } from '../entities/EventCategoryEntity';
import { EventType } from '../entities/EventTypeEntity';
import { getBDConnection } from '../utils/Comms';
import { User } from '../entities/UserEntity';
import { Event } from '../entities/EventEntity';
import { v4 } from 'uuid';
import { classToPlain, plainToClass } from 'class-transformer';

const debug = debugLib('td:EventService');

export const getEvents = async (userId: number): Promise<any | undefined> => {
    debug('[NEW] Event query');
    const conn = await getBDConnection();

    try {
        const eventRepo = conn.getRepository(Event);
        const events = await eventRepo.find({user_id: userId});
        return classToPlain(events);
    } catch (error) {
        debug(debugErrorMsg, error);
        return Promise.reject({ error, message: 'Could not get events' });
    } finally {
        await conn.close();
    }
};

export const createEvent = async (eventRq: IEventDef, userId: number): Promise<any | undefined> => {
    debug('[NEW] Create Event');
    const conn = await getBDConnection();

    try {
        const userRepo = conn.getRepository(User);
        const existingUser = await userRepo.findOne({id: userId});

        if (existingUser) {
            const eventClass = plainToClass(Event, eventRq);
            eventClass.id = v4();
            eventClass.user_id = existingUser.id;
            const eventRepo = conn.getRepository(Event);
            const eventSaved = await eventRepo.save(eventClass);
            debug('[NEW] User created');
            return classToPlain(eventSaved);
        } else {
            return Promise.reject({ status: 400, message: 'Invalid User' });
        }
    } catch (error) {
        debug(debugErrorMsg, error);
        return Promise.reject({ error, message: 'Could not create event' });
    } finally {
        await conn.close();
    }
};

export const updateEvent = async (eventId: string, payload: IEventDef): Promise<any | undefined> => {
    debug('[NEW] Update event');
    const conn = await getBDConnection();

    try {
        const eventRepo = conn.getRepository(Event);
        const existingEvent = await eventRepo.findOne({id: eventId});

        if (existingEvent) {
            existingEvent.event_type = payload.event_type;
            existingEvent.event_category = payload.event_category;
            existingEvent.event_initial_date = payload.event_initial_date;
            existingEvent.event_final_date = payload.event_final_date;
            existingEvent.event_address = payload.event_address;
            existingEvent.event_name = payload.event_name;
            existingEvent.event_place = payload.event_place;
            const eventSaved = await eventRepo.save(existingEvent);
            return classToPlain(eventSaved);
        } else {
            return Promise.reject({ status: 400, message: 'Invalid Event' });
        }
    } catch (error) {
        debug(debugErrorMsg, error);
        return Promise.reject({ error, message: 'Could not update event' });
    } finally {
        await conn.close();
    }
};


export const getEventById = async (eventId: string): Promise<any | undefined> => {
    debug('[NEW] Event by id query');
    const conn = await getBDConnection();

    try {
        const eventRepo = conn.getRepository(Event);
        const event = await eventRepo.findOne({id: eventId});
        return classToPlain(event);
    } catch (error) {
        debug(debugErrorMsg, error);
        return Promise.reject({ error, message: 'Could not get event by id' });
    } finally {
        await conn.close();
    }
};

export const deleteEvent = async (eventId: string): Promise<any | undefined> => {
    debug('[NEW] Delete Event');
    const conn = await getBDConnection();
    try {
        const eventRepo = conn.getRepository(Event);
        const eventToRemove = await eventRepo.findOne({id: eventId});

        if (eventToRemove) {
            const eventExclude = classToPlain(eventToRemove);
            await eventRepo.remove(eventToRemove);
            debug('[NEW] Event deleted');
            return eventExclude;
        } else {
            return Promise.reject({ status: 400, message: 'Invalid Event' });
        }
    } catch (error) {
        debug(debugErrorMsg, error);
        return Promise.reject({ error, message: 'Could not delete event' });
    } finally {
        await conn.close();
    }
};

export const getEventCategories = async (): Promise<EventCategory[] |undefined> => {
    debug('[NEW] Event categories query');
    const conn = await getBDConnection();

    try {
        const categoryRepo = conn.getRepository(EventCategory);
        return await categoryRepo.find();
    } catch (error) {
        debug(debugErrorMsg, error);
        return Promise.reject({ error, message: 'Could not get event categories' });
    } finally {
        await conn.close();
    }
};

export const getEventType = async (): Promise<EventType[] |undefined> => {
    debug('[NEW] Event type query');
    const conn = await getBDConnection();

    try {
        const typeRepo = conn.getRepository(EventType);
        return await typeRepo.find();
    } catch (error) {
        debug(debugErrorMsg, error);
        return Promise.reject({ error, message: 'Could not get event type' });
    } finally {
        await conn.close();
    }
};
