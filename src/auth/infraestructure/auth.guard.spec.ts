import { UnauthorizedException } from '@nestjs/common';
import { ExecutionContext } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let authServiceMock: jest.Mocked<AuthService>;

  beforeEach(() => {
    authServiceMock = {
      verifyJwt: jest.fn(),
    } as unknown as jest.Mocked<AuthService>;

    authGuard = new AuthGuard(authServiceMock);
  });

  describe('canActivate', () => {
    it('should allow access if the token is valid', async () => {
      const mockToken = 'valid-jwt-token';
      const mockUser = { id: 'user123', email: 'test@example.com' };

      authServiceMock.verifyJwt.mockResolvedValue(mockUser);

      const mockRequest = {
        headers: {
          authorization: `Bearer ${mockToken}`,
        },
      };
      const contextMock = {
        switchToHttp: jest.fn().mockReturnValue({
          getRequest: jest.fn().mockReturnValue(mockRequest),
        }),
      } as unknown as ExecutionContext;

      const result = await authGuard.canActivate(contextMock);

      expect(result).toBe(true);
      expect(mockRequest['user']).toEqual(mockUser);
      expect(authServiceMock.verifyJwt).toHaveBeenCalledWith(mockToken);
    });

    it('should throw UnauthorizedException if no token is provided', async () => {
      const mockRequest = {
        headers: {},
      };
      const contextMock = {
        switchToHttp: jest.fn().mockReturnValue({
          getRequest: jest.fn().mockReturnValue(mockRequest),
        }),
      } as unknown as ExecutionContext;

      await expect(authGuard.canActivate(contextMock)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should throw UnauthorizedException if the token format is invalid', async () => {
      const mockRequest = {
        headers: {
          authorization: 'InvalidFormat',
        },
      };
      const contextMock = {
        switchToHttp: jest.fn().mockReturnValue({
          getRequest: jest.fn().mockReturnValue(mockRequest),
        }),
      } as unknown as ExecutionContext;

      await expect(authGuard.canActivate(contextMock)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should throw UnauthorizedException if the token verification fails', async () => {
      const mockToken = 'invalid-jwt-token';

      authServiceMock.verifyJwt.mockRejectedValue(new Error('Invalid token'));

      const mockRequest = {
        headers: {
          authorization: `Bearer ${mockToken}`,
        },
      };
      const contextMock = {
        switchToHttp: jest.fn().mockReturnValue({
          getRequest: jest.fn().mockReturnValue(mockRequest),
        }),
      } as unknown as ExecutionContext;

      await expect(authGuard.canActivate(contextMock)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });

  describe('extractTokenFromHeader', () => {
    it('should extract the token from a valid Bearer header', () => {
      const mockRequest = {
        headers: {
          authorization: 'Bearer valid-jwt-token',
        },
      };

      const token = authGuard['extractTokenFromHeader'](mockRequest);

      expect(token).toBe('valid-jwt-token');
    });

    it('should return undefined if the header is missing or invalid', () => {
      const mockRequestWithoutHeader = {
        headers: {},
      };
      const mockRequestWithInvalidHeader = {
        headers: {
          authorization: 'InvalidFormat',
        },
      };

      const token1 = authGuard['extractTokenFromHeader'](
        mockRequestWithoutHeader,
      );
      const token2 = authGuard['extractTokenFromHeader'](
        mockRequestWithInvalidHeader,
      );

      expect(token1).toBeUndefined();
      expect(token2).toBeUndefined();
    });
  });
});
