import { VideoOutput } from '../../application/dtos/video-output';
export declare class VideoPresenter {
    id: string;
    title: string;
    userEmail: string;
    status: string;
    path: string;
    createdAt: Date;
    constructor(output: VideoOutput);
}
export declare class VideoCollectionPresenter {
    data: VideoPresenter[];
    meta: {
        total: number;
        currentPage: number;
        perPage: number;
        lastPage: number;
    };
    constructor(output: any);
}
