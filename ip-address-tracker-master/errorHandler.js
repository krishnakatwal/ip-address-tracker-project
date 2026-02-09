////Create Custom Error Classes functions to handle different types of errors
export class InvalidIPError extends Error {
  constructor(message = "Network connection error") {
    super(message);
    this.name = "InvalidIPError";
  }
}
export class APIError extends Error {
  constructor(message = "Invalid or missing data") {
    super(message);
    this.name = "APIError";
  }
}
