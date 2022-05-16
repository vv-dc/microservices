import fp from 'fastify-plugin';

import { EmailService } from './email.service.js';
import { NotifierService } from './notifier.service.js';

const email = async (fastify) => {
    const emailService = new EmailService();
    const notifierService = new NotifierService(emailService);

    fastify.brokerService.subscribeSingle(
        'new-customer',
        notifierService.sendHelloEmail.bind(notifierService)
    );
};

export default fp(email, {
    name: 'email',
    dependencies: ['broker'],
});
