import nodemailer from 'nodemailer';

import { getLogger } from '../../logger.js';
import { config } from '../../config.js';

const { transport, from } = config.email;

export class EmailService {
    #transport;
    #logger;

    constructor() {
        this.#transport = nodemailer.createTransport(transport);
        this.#logger = getLogger('email-service');
    }

    async send(options) {
        const response = await this.#transport.sendMail({ ...options, from });
        this.#logger.info(`Sent email to ${options.to}`);
        return response;
    }
}
