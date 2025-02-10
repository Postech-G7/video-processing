import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { EnvConfigService } from '../../shared/infraestructure/env-config/env-config.service';

describe('AuthService', () => {
  let authService: AuthService;
  let jwtServiceMock: jest.Mocked<JwtService>;
  let envConfigServiceMock: jest.Mocked<EnvConfigService>;

  beforeEach(async () => {
    jwtServiceMock = {
      signAsync: jest.fn(),
      verifyAsync: jest.fn(),
      decode: jest.fn(),
    } as unknown as jest.Mocked<JwtService>;

    envConfigServiceMock = {
      getJwtSecret: jest.fn(),
    } as unknown as jest.Mocked<EnvConfigService>;

    const moduleRef = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: JwtService, useValue: jwtServiceMock },
        { provide: EnvConfigService, useValue: envConfigServiceMock },
      ],
    }).compile();

    authService = moduleRef.get<AuthService>(AuthService);
  });

  describe('generateJwt', () => {
    it('should generate a JWT token with the provided user data', async () => {
      const mockUserId = 'user123';
      const mockUserEmail = 'test@example.com';
      const mockAccessToken = 'mock-jwt-token';

      jwtServiceMock.signAsync.mockResolvedValue(mockAccessToken);

      const result = await authService.generateJwt({
        userId: mockUserId,
        userEmail: mockUserEmail,
      });

      expect(jwtServiceMock.signAsync).toHaveBeenCalledWith(
        { payload: { id: mockUserId, email: mockUserEmail } },
        {},
      );
      expect(result).toEqual({ accessToken: mockAccessToken });
    });
  });

  describe('verifyJwt', () => {
    it('should verify a JWT token and return the decoded payload', async () => {
      const mockToken = 'mock-jwt-token';
      const mockPayload = { id: 'user123', email: 'test@example.com' };
      const mockSecret = 'mock-secret';

      envConfigServiceMock.getJwtSecret.mockReturnValue(mockSecret);
      jwtServiceMock.verifyAsync.mockResolvedValue(mockPayload);

      const result = await authService.verifyJwt(mockToken);

      expect(envConfigServiceMock.getJwtSecret).toHaveBeenCalled();
      expect(jwtServiceMock.verifyAsync).toHaveBeenCalledWith(mockToken, {
        secret: mockSecret,
      });
      expect(result).toEqual(mockPayload);
    });

    it('should throw an error if the token is invalid', async () => {
      const mockToken = 'invalid-token';
      const mockSecret = 'mock-secret';

      envConfigServiceMock.getJwtSecret.mockReturnValue(mockSecret);
      jwtServiceMock.verifyAsync.mockRejectedValue(new Error('Invalid token'));

      await expect(authService.verifyJwt(mockToken)).rejects.toThrow(
        'Invalid token',
      );
    });
  });

  describe('decode', () => {
    it('should decode a JWT token and return the decoded payload', async () => {
      const mockToken = 'mock-jwt-token';
      const mockDecodedPayload = { id: 'user123', email: 'test@example.com' };

      jwtServiceMock.decode.mockReturnValue(mockDecodedPayload);

      const result = await authService.decode(mockToken);

      expect(jwtServiceMock.decode).toHaveBeenCalledWith(mockToken);
      expect(result).toEqual(mockDecodedPayload);
    });

    it('should return null if the token cannot be decoded', async () => {
      const mockToken = 'invalid-token';

      jwtServiceMock.decode.mockReturnValue(null);

      const result = await authService.decode(mockToken);

      expect(jwtServiceMock.decode).toHaveBeenCalledWith(mockToken);
      expect(result).toBeNull();
    });
  });
});
