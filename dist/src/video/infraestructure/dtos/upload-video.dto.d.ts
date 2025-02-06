import { UploadVideoUseCase } from 'src/video/application/usecases/upload-video.usecase';
export declare class UploadVideoDto implements UploadVideoUseCase.Input {
    file: Express.Multer.File;
    jwtToken: string;
}
