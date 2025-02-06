import { VideoEntity } from '../../domain/entities/video.entity';

export type VideoOutput = {
  id: string;
  title: string;
  userEmail: string;
  status: 'processing' | 'completed' | 'failed' | 'retrieved';
  path: string;
  createdAt: Date;
};

export class VideoOutputMapper {
  static toOutput(entity: VideoEntity): VideoOutput {
    return {
      id: entity.id,
      title: entity.title,
      userEmail: entity.userEmail,
      status: entity.status,
      path: entity.path,
      createdAt: entity.createdAt,
    };
  }
}
