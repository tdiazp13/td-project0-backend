import debugLib from 'debug';
import config from '../config';
import { Connection, createConnection } from 'typeorm';
import 'reflect-metadata';

const debug = debugLib('td:DBService');

const getBDConnection = async (): Promise<Connection> => {
    try {
        debug(`[DB NEW CONNECTION]`);
        return await createConnection({
            database: config.DATABASE_SCHEMA,
            entities: [
                `${__dirname}/../entities/*{.ts,.js}`
            ],
            host: config.DATABASE_HOST,
            password: config.DATABASE_PASSWORD,
            port: +config.DATABASE_PORT,
            synchronize: false,
            type: 'mysql',
            username: config.DATABASE_USER,
        });
    } catch (error) {
        debug('[ERROR-DB]: %s', error);
        return Promise.reject({ message: 'Could not connect to DB', error });
    }
};

export { getBDConnection };
