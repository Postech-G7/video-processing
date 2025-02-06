import { VideoRepository } from '../../domain/repositories/video.repository';
import { VideoOutput } from '../dtos/video-output';
import { UseCase as DefaultUseCase } from '../../../shared/application/providers/usecases/use-case';
import { SearchInput } from '../../../shared/application/dtos/search-input';
import { PaginationOutput } from '../../../shared/application/dtos/pagination-output';
export declare namespace ListVideosUseCase {
    type Input = SearchInput<string>;
    type Output = PaginationOutput<VideoOutput>;
    class UseCase implements DefaultUseCase<Input, Output> {
        private videoRepository;
        constructor(videoRepository: VideoRepository.Repository);
        execute(input: Input): Promise<Output>;
        private toOutput;
    }
}
