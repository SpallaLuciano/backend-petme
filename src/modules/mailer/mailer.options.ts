import { MailerOptions } from '@nestjs-modules/mailer';
import { readFileSync } from 'fs';

const caCert = readFileSync('src/common/certificates/outlook-root-ca.crt');

export const options: MailerOptions = {
  transport: {
    host: process.env.MAILER_HOST,
    port: Number(process.env.MAILER_PORT),
    secure: false,
    auth: {
      user: process.env.MAILER_USER,
      pass: process.env.MAILER_PASS,
    },
    tls: {
      ca: [caCert],
      rejectUnauthorized: false,
    },
    requireTLS: true,
  },
  defaults: {
    from: process.env.MAILER_USER,
  },
};
