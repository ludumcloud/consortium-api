// tslint:disable:max-classes-per-file
export class InvalidTokenException extends Error {
  constructor (cause: string) {
    super();
    this.name = 'InvalidTokenException';
    this.message = cause;
  }
}

export class InvalidCredentialsException extends Error {
  constructor (cause: string) {
    super();
    this.name = 'InvalidCredentialsException';
    this.message = cause;
  }
}
