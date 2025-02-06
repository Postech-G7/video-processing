import { Entity } from '../../../shared/domain/entities/entity';
export type VideoProps = {
    title: string;
    createdAt?: Date;
    status: 'processing' | 'completed' | 'failed' | 'retrieved';
    userEmail: string;
    path?: string;
};
export declare class VideoEntity extends Entity<VideoProps> {
    constructor(props: VideoProps, id?: string);
    static validate(data: VideoProps): void;
    updateStatus(value: 'processing' | 'completed' | 'failed' | 'retrieved'): void;
    get title(): string;
    get createdAt(): Date;
    get status(): 'processing' | 'completed' | 'failed' | 'retrieved';
    get userEmail(): string;
    get path(): string | undefined;
}
