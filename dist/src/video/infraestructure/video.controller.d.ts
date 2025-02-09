import { FastifyRequest } from 'fastify';
import { ListVideosUseCase } from '../application/usecases/list-videos.usecase';
import { ListVideosDto } from './dtos/list-videos.dto';
import { UpdateVideoDto } from './dtos/update-video.dto';
import { VideoCollectionPresenter, VideoPresenter } from './presenters/video.presenter';
import { VideoOutput } from '../application/dtos/video-output';
export declare class VideosController {
    private deleteProcessedVideoUseCase;
    private retrieveProcessedVideoUseCase;
    private uploadVideoUseCase;
    private processVideoUseCase;
    private getVideoUseCase;
    private updateVideoUseCase;
    private listVideosUseCase;
    static videoToResponse(output: VideoOutput): VideoPresenter;
    static listVideosToResponse(output: ListVideosUseCase.Output): VideoCollectionPresenter;
    upload(request: FastifyRequest, authHeader: string): Promise<VideoOutput>;
    process(id: string): Promise<VideoOutput>;
    getVideo(id: string): Promise<VideoPresenter>;
    getProcessedVideo(id: string): Promise<void>;
    deleteProcessed(id: string): Promise<void>;
    list(listVideosDto: ListVideosDto): Promise<VideoCollectionPresenter>;
    updateStatus(id: string, updateVideoDto: UpdateVideoDto): Promise<VideoOutput>;
}
