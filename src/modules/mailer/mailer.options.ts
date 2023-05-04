import { MailerOptions } from '@nestjs-modules/mailer';

export const options: MailerOptions = {
  transport: {
    host: 'smtp-mail.outlook.com',
    port: 587,
    secure: false,
    auth: {
      user: 'petme.cba@outlook.com',
      pass: 'kfqbypbbobfwpgph',
    },
    requireTLS: true,
  },
  defaults: {
    from: 'petme.cba@outlook.com',
  },
};
