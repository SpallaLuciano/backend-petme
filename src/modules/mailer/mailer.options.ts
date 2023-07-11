import { MailerOptions } from '@nestjs-modules/mailer';
import { readFileSync } from 'fs';

//src\common\certificates

const caCert = readFileSync('src/common/certificates/outlook-root-ca.crt');

export const options: MailerOptions = {
  transport: {
    host: 'smtp-mail.outlook.com',
    port: 587,
    secure: false,
    auth: {
      user: 'petme.cba@outlook.com',
      pass: 'xqkcfmaaejepllud',
    },
    tls: {
      ca: [caCert],
      rejectUnauthorized: false,
    },
    requireTLS: true,
  },
  defaults: {
    from: 'petme.cba@outlook.com',
  },
};
