import { VideoRepository } from '../../domain/repositories/video.repository';
import { UseCase as DefaultUseCase } from '../../../shared/application/providers/usecases/use-case';
import { VideoOutput } from '../dtos/video-output';
import { GoogleCloudStorageService } from '../../../shared/infraestructure/storage/implementations/google-cloud-storage';
export declare namespace ProcessVideoUseCase {
    type Input = {
        id: string;
    };
    type Output = VideoOutput;
    class UseCase implements DefaultUseCase<Input, Output> {
        private videoRepository;
        private storageService;
        constructor(videoRepository: VideoRepository.Repository, storageService: GoogleCloudStorageService);
        private createTempDir;
        private processVideo;
        private createZipFile;
        execute(input: Input): Promise<Output>;
    }
}
