import { VideoRepository } from '../../domain/repositories/video.repository';
import { UseCase as DefaultUseCase } from '../../../shared/application/providers/usecases/use-case';
export declare namespace ProcessVideoUseCase {
    type Input = {
        id: string;
    };
    type Output = void;
    class UseCase implements DefaultUseCase<Input, Output> {
        private videoRepository;
        constructor(videoRepository: VideoRepository.Repository);
        private createTempDir;
        private processVideo;
        private createZipFile;
        private cleanup;
        execute(input: Input): Promise<Output>;
    }
}
