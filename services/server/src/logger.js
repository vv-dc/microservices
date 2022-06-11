import { pino } from 'pino';

const logger = pino(); // default parent logger

export const getLogger = (name) => {
    return logger.child({ name });
};
