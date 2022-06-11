import { getLogger } from "../../logger.js";

export class NotifierService {
    #emailService;
    #logger;

    constructor(emailService) {
        this.#emailService = emailService;
        this.#logger = getLogger('notifier-service');
    }

    async sendHelloEmail(user) {
        const options = {
            to: user.email,
            subject: 'Hello from Dreamteam!',
            text: `${user.fullName}, we are glad, that you chose our application! Your unique id is ${user.id}`,
        };
        await this.#emailService.send(options);
        this.#logger.info(`Notified with hello: ${options.to}`);
    }
}
