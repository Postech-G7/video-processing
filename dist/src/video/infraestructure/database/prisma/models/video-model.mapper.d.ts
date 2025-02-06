import { VideoEntity } from '../../../../domain/entities/video.entity';
import { Video } from '@prisma/client';
export declare class VideoModelMapper {
    static toEntity(model: Video): VideoEntity;
}
