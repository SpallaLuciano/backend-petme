import { MailerOptions } from '@nestjs-modules/mailer';
import { readFileSync } from 'fs';
import { mailerEnvs } from '../../common';

//src\common\certificates

const caCert = readFileSync('src/common/certificates/outlook-root-ca.crt');

const { host, pass, user, port } = mailerEnvs;

export const options: MailerOptions = {
  transport: {
    host,
    port,
    secure: false,
    auth: {
      user,
      pass,
    },
    tls: {
      ca: [caCert],
      rejectUnauthorized: false,
    },
    requireTLS: true,
  },
  defaults: {
    from: user,
  },
};
