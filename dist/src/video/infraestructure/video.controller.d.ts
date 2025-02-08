import { ProcessVideoUseCase } from '../application/usecases/process-video.usecase';
import { ListVideosUseCase } from '../application/usecases/list-videos.usecase';
import { ListVideosDto } from './dtos/list-videos.dto';
import { UpdateVideoDto } from './dtos/update-video.dto';
import { UploadProcessedVideoDto } from './dtos/upload-processed-video.dto';
import { VideoCollectionPresenter, VideoPresenter } from './presenters/video.presenter';
import { VideoOutput } from '../application/dtos/video-output';
import { FastifyRequest } from 'fastify';
export declare class VideosController {
    private deleteProcessedVideoUseCase;
    private retrieveProcessedVideoUseCase;
    private uploadProcessedVideoUseCase;
    private uploadVideoUseCase;
    private processVideoUseCase;
    private getVideoUseCase;
    private updateVideoUseCase;
    private listVideosUseCase;
    private authService;
    static videoToResponse(output: VideoOutput): VideoPresenter;
    static listVideosToResponse(output: ListVideosUseCase.Output): VideoCollectionPresenter;
    upload(request: FastifyRequest, headers: Record<string, string>): Promise<VideoOutput>;
    uploadProcessed(uploadProcessedVideoDto: UploadProcessedVideoDto): Promise<void>;
    getVideo(id: string): Promise<VideoPresenter>;
    getProcessedVideo(id: string): Promise<void>;
    deleteProcessed(id: string): Promise<void>;
    list(listVideosDto: ListVideosDto): Promise<VideoCollectionPresenter>;
    updateStatus(id: string, updateVideoDto: UpdateVideoDto): Promise<VideoOutput>;
    process(id: string): Promise<ProcessVideoUseCase.Output>;
}
