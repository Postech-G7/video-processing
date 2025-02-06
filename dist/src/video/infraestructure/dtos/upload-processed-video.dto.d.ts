import { UploadProcessedVideoUseCase } from 'src/video/application/usecases/upload-processed-video.usecase';
export declare class UploadProcessedVideoDto implements UploadProcessedVideoUseCase.Input {
    id: string;
    file: Express.Multer.File;
    destination: string;
}
