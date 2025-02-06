import { GoogleCloudStorageService } from '../../../shared/infraestructure/storage/implementations/google-cloud-storage';
import { VideoRepository } from '../../domain/repositories/video.repository';
import { UseCase as DefaultUseCase } from '../../../shared/application/providers/usecases/use-case';
export declare namespace UploadProcessedVideoUseCase {
    type Input = {
        file: Express.Multer.File;
        destination: string;
        id: string;
    };
    type Output = void;
    class UseCase implements DefaultUseCase<Input, Output> {
        private readonly storageService;
        private readonly videoRepository;
        constructor(storageService: GoogleCloudStorageService, videoRepository: VideoRepository.Repository);
        execute(input: Input): Promise<Output>;
    }
}
