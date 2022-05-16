export class NotifierService {
    #emailService;

    constructor(emailService) {
        this.#emailService = emailService;
    }

    async sendHelloEmail(user) {
        const options = {
            to: user.email,
            subject: 'Hello from Dreamteam!',
            text: `${user.fullName}, we are glad, that you chose our application! Your unique id is ${user.id}`,
        };
        await this.#emailService.send(options);
    }
}
