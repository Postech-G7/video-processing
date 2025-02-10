import { BadRequestError } from './bad-request-error';

describe('BadRequestError', () => {
  it('should create an instance of BadRequestError with the correct message and name', () => {
    const errorMessage = 'This is a bad request error';
    const error = new BadRequestError(errorMessage);

    expect(error).toBeInstanceOf(BadRequestError);
    expect(error.message).toBe(errorMessage);
    expect(error.name).toBe('BadRequestError');
  });

  it('should inherit from the Error class', () => {
    const errorMessage = 'This is a bad request error';
    const error = new BadRequestError(errorMessage);

    expect(error).toBeInstanceOf(Error);
  });
});
