import { VideoEntity } from '../../domain/entities/video.entity';
export type VideoOutput = {
    id: string;
    title: string;
    createdAt: Date;
    status: 'processing' | 'completed' | 'failed' | 'retrieved';
    userId: string;
    userEmail: string;
    base64: string;
    processedVideoUrl?: string;
};
export declare class VideoOutputMapper {
    static toOutput(entity: VideoEntity): VideoOutput;
}
