import { VideoEntity } from '../../domain/entities/video.entity';
export type VideoOutput = {
    id: string;
    title: string;
    userEmail: string;
    status: 'processing' | 'completed' | 'failed' | 'retrieved';
    path: string;
    createdAt: Date;
};
export declare class VideoOutputMapper {
    static toOutput(entity: VideoEntity): VideoOutput;
}
