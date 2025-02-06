import { ValidationError } from '../../../../../shared/domain/errors/validation-error';
import { VideoEntity } from '../../../../domain/entities/video.entity';
import { Video } from '@prisma/client';

export class VideoModelMapper {
  static toEntity(model: Video) {
    const { title, userEmail, status, createdAt } = model;
    try {
      return new VideoEntity({
        title,
        userEmail,
        status,
        createdAt,
      }, model.id);
    } catch (error) {
      throw new ValidationError('Entity not loaded');
    }
  }
}
