import { VideoEntity } from './video.entity';
import { EntityValidationError } from '../../../shared/domain/errors/validation-error';

jest.mock('../validators/video.validator', () => ({
  VideoValidatorFactory: {
    create: jest.fn(() => ({
      validate: jest.fn((data) => {
        if (
          !data.title ||
          !data.status ||
          !data.userId ||
          !data.userEmail ||
          !data.base64
        ) {
          return false;
        }
        return true;
      }),
      errors: ['Mock validation error'],
    })),
  },
}));

describe('VideoEntity', () => {
  describe('constructor', () => {
    it('should create a valid VideoEntity instance', () => {
      const props = {
        title: 'Test Video',
        status: 'processing' as const,
        userId: 'user123',
        userEmail: 'test@example.com',
        base64: 'base64-encoded-string',
      };

      const entity = new VideoEntity(props);

      expect(entity.id).toBeDefined();
      expect(entity.title).toBe('Test Video');
      expect(entity.status).toBe('processing');
      expect(entity.userId).toBe('user123');
      expect(entity.userEmail).toBe('test@example.com');
      expect(entity.base64).toBe('base64-encoded-string');
      expect(entity.createdAt).toBeInstanceOf(Date);
    });

    it('should throw EntityValidationError for invalid data', () => {
      const invalidProps = {
        title: '',
        status: 'processing' as const,
        userId: 'user123',
        userEmail: 'test@example.com',
        base64: 'base64-encoded-string',
      };

      expect(() => new VideoEntity(invalidProps)).toThrow(
        EntityValidationError,
      );
    });
  });

  describe('updateStatus', () => {
    it('should update the status of the video', () => {
      const props = {
        title: 'Test Video',
        status: 'processing' as const,
        userId: 'user123',
        userEmail: 'test@example.com',
        base64: 'base64-encoded-string',
      };

      const entity = new VideoEntity(props);
      entity.updateStatus('completed');

      expect(entity.status).toBe('completed');
    });
  });

  describe('updateVideoUrl', () => {
    it('should update the processed video URL', () => {
      const props = {
        title: 'Test Video',
        status: 'processing' as const,
        userId: 'user123',
        userEmail: 'test@example.com',
        base64: 'base64-encoded-string',
      };

      const entity = new VideoEntity(props);
      entity.updateVideoUrl('https://example.com/processed-video.mp4');

      expect(entity.processedVideoUrl).toBe(
        'https://example.com/processed-video.mp4',
      );
    });
  });

  describe('getters', () => {
    it('should return the correct values for all getters', () => {
      const props = {
        title: 'Test Video',
        status: 'processing' as const,
        userId: 'user123',
        userEmail: 'test@example.com',
        base64: 'base64-encoded-string',
      };

      const entity = new VideoEntity(props);

      expect(entity.base64).toBe('base64-encoded-string');
      expect(entity.title).toBe('Test Video');
      expect(entity.createdAt).toBeInstanceOf(Date);
      expect(entity.status).toBe('processing');
      expect(entity.userId).toBe('user123');
      expect(entity.userEmail).toBe('test@example.com');
      expect(entity.processedVideoUrl).toBeNull();
    });
  });
});
