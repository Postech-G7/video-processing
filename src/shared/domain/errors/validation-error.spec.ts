import { EntityValidationError, ValidationError } from './validation-error';
//import { EntityValidationError } from './entity-validation-error';

describe('ValidationError', () => {
  it('should create an instance of ValidationError', () => {
    const error = new ValidationError();

    expect(error).toBeInstanceOf(ValidationError);
    expect(error.message).toBe(''); // A mensagem padrão de Error é uma string vazia
    expect(error.name).toBe('ValidationError');
  });

  it('should inherit from the Error class', () => {
    const error = new ValidationError();

    expect(error).toBeInstanceOf(Error);
  });
});

describe('EntityValidationError', () => {
  it('should create an instance of EntityValidationError with the correct message and errors', () => {
    const mockErrors = { field1: ['Error 1'], field2: ['Error 2'] };
    const error = new EntityValidationError(mockErrors);

    expect(error).toBeInstanceOf(EntityValidationError);
    expect(error.message).toBe('Entity Validation Error');
    expect(error.name).toBe('EntityValidationError');
    expect(error.errors).toEqual(mockErrors);
  });

  it('should inherit from the Error class', () => {
    const mockErrors = { field1: ['Error 1'] };
    const error = new EntityValidationError(mockErrors);

    expect(error).toBeInstanceOf(Error);
  });
});
