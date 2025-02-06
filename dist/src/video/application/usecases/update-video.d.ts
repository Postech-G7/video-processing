import { UseCase as DefaultUseCase } from '../../../shared/application/providers/usecases/use-case';
import { VideoRepository } from 'src/video/domain/repositories/video.repository';
import { VideoOutput } from '../dtos/video-output';
export declare namespace UpdateVideoUseCase {
    type Input = {
        id: string;
        status: 'processing' | 'completed' | 'failed' | 'retrieved';
    };
    type Output = VideoOutput;
    class UseCase implements DefaultUseCase<Input, Output> {
        private videoRepository;
        constructor(videoRepository: VideoRepository.Repository);
        execute(input: Input): Promise<Output>;
        private toOutput;
    }
}
