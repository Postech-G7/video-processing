import { ServerError } from '../../../../shared/domain/errors/server-error';
import { ArgumentsHost } from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { ServerErrorFilter } from './server-error';

describe('ServerErrorFilter', () => {
  let filter: ServerErrorFilter;
  let mockResponse: jest.Mocked<FastifyReply>;
  let mockArgumentsHost: jest.Mocked<ArgumentsHost>;

  beforeEach(() => {
    filter = new ServerErrorFilter();

    // Mock da resposta HTTP (FastifyReply)
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as jest.Mocked<FastifyReply>;

    // Mock do ArgumentsHost
    mockArgumentsHost = {
      switchToHttp: jest.fn().mockReturnValue({
        getResponse: jest.fn().mockReturnValue(mockResponse),
      }),
    } as unknown as jest.Mocked<ArgumentsHost>;
  });

  it('should handle ServerError and return a 500 response', () => {
    const exception = new ServerError('Something went wrong');

    filter.catch(exception, mockArgumentsHost);

    // Verifica se o status foi definido como 500
    expect(mockResponse.status).toHaveBeenCalledWith(500);

    // Verifica se a resposta foi enviada com o formato correto
    expect(mockResponse.send).toHaveBeenCalledWith({
      statusCode: 500,
      error: 'Internal Server Error',
      message: 'Something went wrong',
    });
  });

  it('should handle ServerError with empty message and return a default message', () => {
    const exception = new ServerError('');

    filter.catch(exception, mockArgumentsHost);

    // Verifica se o status foi definido como 500
    expect(mockResponse.status).toHaveBeenCalledWith(500);

    // Verifica se a resposta foi enviada com uma mensagem padrão
    expect(mockResponse.send).toHaveBeenCalledWith({
      statusCode: 500,
      error: 'Internal Server Error',
      message: '',
    });
  });
});
