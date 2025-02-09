import { VideoOutput } from '../../application/dtos/video-output';
import { CollectionPresenter } from '../../../shared/infraestructure/presenters/collection.presenter';
import { ListVideosUseCase } from '../../application/usecases/list-videos.usecase';
export declare class VideoPresenter {
    id: string;
    title: string;
    status: string;
    base64: string;
    userId: string;
    userEmail: string;
    createdAt: Date;
    constructor(output: VideoOutput);
}
export declare class VideoCollectionPresenter extends CollectionPresenter {
    data: VideoPresenter[];
    constructor(output: ListVideosUseCase.Output);
}
