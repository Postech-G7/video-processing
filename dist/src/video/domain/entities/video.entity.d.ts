import { Entity } from '../../../shared/domain/entities/entity';
export type VideoProps = {
    title: string;
    createdAt?: Date;
    status: 'processing' | 'completed' | 'failed' | 'retrieved';
    userId: string;
    userEmail: string;
    base64: string;
    processedVideoUrl?: string;
};
export declare class VideoEntity extends Entity<VideoProps> {
    constructor(props: VideoProps, id?: string);
    static validate(data: VideoProps): void;
    updateStatus(value: 'processing' | 'completed' | 'failed' | 'retrieved'): void;
    updateVideoUrl(value: string): void;
    get base64(): string;
    get title(): string;
    get createdAt(): Date;
    get status(): 'processing' | 'completed' | 'failed' | 'retrieved';
    get userId(): string;
    get userEmail(): string;
    get processedVideoUrl(): string | null;
}
