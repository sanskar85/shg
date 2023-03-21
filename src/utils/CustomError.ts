const ERROR_TITLE = 'Unhandled Error.';
abstract class CustomError extends Error {
  abstract title: string;
  abstract message: string;
  constructor(msg: string = ERROR_TITLE) {
    super(msg);
    Object.setPrototypeOf(this, CustomError.prototype);
  }
  abstract serializeError(): {
    title: string;
    message: string;
  };
}

export class CreateCustomError extends CustomError {
  title: string = ERROR_TITLE;
  message: string = ERROR_TITLE;
  error: any = null;
  constructor(title: string);
  constructor(title: string, error: any);
  constructor(...args: (string | number)[]) {
    super(ERROR_TITLE);
    Object.setPrototypeOf(this, CreateCustomError.prototype);
    if (args.length === 1) {
      const [title] = args;
      this.title = title as string;
    } else {
      const [title, error] = args;
      this.title = title as string;
      this.error = error;
    }
  }

  serializeError() {
    return {
      title: ERROR_TITLE,
      message: ERROR_TITLE,
    };
  }
}

export default CustomError;
