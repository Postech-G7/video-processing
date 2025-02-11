import { ConflictError } from './conflict-error';

describe('ConflictError', () => {
  it('should create an instance of ConflictError with the correct message and name', () => {
    const errorMessage = 'This is a conflict error';
    const error = new ConflictError(errorMessage);

    expect(error).toBeInstanceOf(ConflictError);
    expect(error.message).toBe('message'); // Verifica se a mensagem padrão foi usada
    expect(error.name).toBe('ConflictError');
  });

  it('should inherit from the Error class', () => {
    const errorMessage = 'This is a conflict error';
    const error = new ConflictError(errorMessage);

    expect(error).toBeInstanceOf(Error);
  });
});
