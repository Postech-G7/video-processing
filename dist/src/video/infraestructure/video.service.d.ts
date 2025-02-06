import { UploadVideoDto } from './dtos/upload-video.dto';
import { UploadProcessedVideoDto } from './dtos/upload-processed-video.dto';
export declare class VideoService {
    create(createVideoDto: UploadVideoDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateVideoDto: UploadProcessedVideoDto): string;
    remove(id: number): string;
}
