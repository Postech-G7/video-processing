import { VideoRepository } from '../../domain/repositories/video.repository';
import { VideoOutput } from '../dtos/video-output';
import { UseCase as DefaultUseCase } from '../../../shared/application/providers/usecases/use-case';
export declare namespace GetVideoUseCase {
    type Input = {
        id: string;
    };
    type Output = VideoOutput;
    class UseCase implements DefaultUseCase<Input, Output> {
        private videoRepository;
        constructor(videoRepository: VideoRepository.Repository);
        execute(input: Input): Promise<Output>;
        private toOutput;
    }
}
