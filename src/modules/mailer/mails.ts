export function getVerificationMail(token: string) {
  const link = getVerificationLink(token);

  const message = `<text>
  Te damos la bienvenida a PetMe.<br>
  Solo falta un paso más.<br>
  <br>
  Para completar tu registro de usuario ingresa al <a href="::link">link</a> o ingresa la siguiente url en tu navegador:<br>
  ::link<br>
  <br>
  En caso de no haber creado el usuario desestima este mail.
  </text>`;

  return message.replace(/::link/g, link);
}

function getVerificationLink(token: string) {
  return `${process.env.FRONT_HOST}/${process.env.MAILER_VERIFICATION}/${token}`;
}

export function getRecoverMail(token: string) {
  const link = getRecoverLink(token);

  const message = `<text>
  Hola<br>
  Solicitaste el cambio de contraseña.<br>
  <br>
  Para realizarlo ingresa en el <a href="::link">link</a> o ingresa la siguiente url en tu navegador:<br>
  ::link<br>
  <br>
  En caso de no haber solicitado el cambio de contraseña desestima este mail.
  </text>`;

  return message.replace(/::link/g, link);
}

function getRecoverLink(token: string) {
  return `${process.env.FRONT_HOST}/${process.env.MAILER_RECOVER}/${token}`;
}

export const updatedPasswordMail = `<text>
Hola<br>
Se cambió con éxito la contraseña!<br>
</text>`;
