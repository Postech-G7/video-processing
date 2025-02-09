import { VideoRepository } from '../../domain/repositories/video.repository';
import { VideoOutput } from '../dtos/video-output';
import { UseCase as DefaultUseCase } from '../../../shared/application/providers/usecases/use-case';
import { AuthService } from 'src/auth/infraestructure/auth.service';
export declare namespace UploadVideoUseCase {
    type Input = {
        file: any;
        jwtToken: string;
    };
    type Output = VideoOutput;
    class UseCase implements DefaultUseCase<Input, Output> {
        private videoRepository;
        private authService;
        constructor(videoRepository: VideoRepository.Repository, authService: AuthService);
        execute(input: Input): Promise<Output>;
        private toOutput;
    }
}
