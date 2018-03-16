class CustomError extends Error {
  constructor(...args) {
    super(...args);
    Error.captureStackTrace(this, CustomError);
  }

  set code(code) {
    this.code = code;
  }

  get code() {
    return this.code;
  }
}

export default CustomError;
