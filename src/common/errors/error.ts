import { ResponseStatus } from '../response';

export class CatchableException extends Error {
  constructor(message: string, public status: ResponseStatus, error?: Error) {
    super(message);

    if (error) {
      console.error(error.message);
    }
  }
}

export class WarningException extends CatchableException {
  constructor(message: string) {
    super(message, ResponseStatus.WARNING);
  }
}

export class ErrorException extends CatchableException {
  constructor(message: string, error?: Error) {
    super(message, ResponseStatus.ERROR, error);
  }
}
