import nodemailer from 'nodemailer';

import { config } from '../../config.js';

const { transport, from } = config.email;

export class EmailService {
    #transport;

    constructor() {
        this.#transport = nodemailer.createTransport(transport);
    }

    async send(options) {
        return await this.#transport.sendMail({ ...options, from });
    }
}
