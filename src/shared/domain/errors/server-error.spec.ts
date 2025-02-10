import { ServerError } from './server-error';

describe('ServerError', () => {
  it('should create an instance of ServerError with the correct message and name', () => {
    const errorMessage = 'This is a server error';
    const error = new ServerError(errorMessage);

    expect(error).toBeInstanceOf(ServerError);
    expect(error.message).toBe('message'); // Verifica se a mensagem padrão foi usada
    expect(error.name).toBe('ServerError');
  });

  it('should inherit from the Error class', () => {
    const errorMessage = 'This is a server error';
    const error = new ServerError(errorMessage);

    expect(error).toBeInstanceOf(Error);
  });
});
