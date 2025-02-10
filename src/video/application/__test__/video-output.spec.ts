import { VideoEntity } from '../../domain/entities/video.entity';
import { VideoOutputMapper } from '../dtos/video-output';

describe('VideoOutputMapper', () => {
  describe('toOutput', () => {
    it('should map a VideoEntity to a VideoOutput object with all fields', () => {
      const mockEntity = new VideoEntity({
        id: 'video123',
        title: 'Test Video',
        createdAt: new Date(),
        status: 'processing',
        userId: 'user456',
        userEmail: 'test@example.com',
        base64: 'base64-encoded-string',
        processedVideoUrl: 'https://example.com/processed-video.mp4',
      });

      const output = VideoOutputMapper.toOutput(mockEntity);

      expect(output).toEqual({
        id: 'video123',
        title: 'Test Video',
        createdAt: mockEntity.createdAt,
        status: 'processing',
        userId: 'user456',
        userEmail: 'test@example.com',
        base64: 'base64-encoded-string',
        processedVideoUrl: 'https://example.com/processed-video.mp4',
      });
    });

    it('should map a VideoEntity to a VideoOutput object with optional fields undefined', () => {
      const mockEntity = new VideoEntity({
        id: 'video123',
        title: 'Test Video',
        createdAt: new Date(),
        status: 'completed',
        userId: 'user456',
        userEmail: 'test@example.com',
        base64: 'base64-encoded-string',
      });

      const output = VideoOutputMapper.toOutput(mockEntity);

      expect(output).toEqual({
        id: 'video123',
        title: 'Test Video',
        createdAt: mockEntity.createdAt,
        status: 'completed',
        userId: 'user456',
        userEmail: 'test@example.com',
        base64: 'base64-encoded-string',
        processedVideoUrl: undefined, // Campo opcional não definido
      });
    });

    it('should throw an error if the entity is invalid or missing required fields', () => {
      const invalidEntity = {
        // Intencionalmente omitindo campos obrigatórios
        id: 'video123',
        title: 'Test Video',
        createdAt: new Date(),
        status: 'processing',
        userId: 'user456',
        // userEmail e base64 estão ausentes
      };

      expect(() => VideoOutputMapper.toOutput(invalidEntity as any)).toThrow();
    });
  });
});
