//import { CredentialsValidationError } from './credentials-validation-error';
import {
  CredentialsValidationError,
  InvalidCredentialsError,
} from './invalid-credentials-error';

describe('CredentialsValidationError', () => {
  it('should create an instance of CredentialsValidationError', () => {
    const error = new CredentialsValidationError();

    expect(error).toBeInstanceOf(CredentialsValidationError);
    expect(error.message).toBe(''); // A mensagem padrão de Error é uma string vazia
    expect(error.name).toBe('CredentialsValidationError');
  });

  it('should inherit from the Error class', () => {
    const error = new CredentialsValidationError();

    expect(error).toBeInstanceOf(Error);
  });
});

describe('InvalidCredentialsError', () => {
  it('should create an instance of InvalidCredentialsError with the correct message and errors', () => {
    const mockErrors = {
      email: ['Email is invalid'],
      password: ['Password is required'],
    };
    const error = new InvalidCredentialsError(mockErrors);

    expect(error).toBeInstanceOf(InvalidCredentialsError);
    expect(error.message).toBe('Invalid Credentials');
    expect(error.name).toBe('InvalidCredentialsError');
    expect(error.errors).toEqual(mockErrors);
  });

  it('should inherit from the Error class', () => {
    const mockErrors = { email: ['Email is invalid'] };
    const error = new InvalidCredentialsError(mockErrors);

    expect(error).toBeInstanceOf(Error);
  });
});
