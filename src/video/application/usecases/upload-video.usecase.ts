import { VideoRepository } from '../../domain/repositories/video.repository';
import { VideoOutput, VideoOutputMapper } from '../dtos/video-output';
import { BadRequestError } from '../../../shared/application/errors/bad-request-error';
import { UseCase as DefaultUseCase } from '../../../shared/application/providers/usecases/use-case';
import { VideoEntity } from '../../domain/entities/video.entity';
import { AuthService } from 'src/auth/infraestructure/auth.service';
import { v5 as uuidv5 } from 'uuid';

// Create a UUID namespace for our application
const UUID_NAMESPACE = '6ba7b810-9dad-11d1-80b4-00c04fd430c8'; // UUID v4 namespace

export namespace UploadVideoUseCase {
  export type Input = {
    file: {
      filename: string;
      file: Buffer;
    };
    jwtToken: string;
  };

  export type Output = VideoOutput;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private videoRepository: VideoRepository.Repository,
      private authService: AuthService,
    ) {}

    async execute(input: Input): Promise<Output> {
      const { file, jwtToken } = input;

      if (!file || !file.file) {
        throw new BadRequestError('File is missing or invalid');
      }

      const decodedToken = await this.authService.verifyJwt<{
        id: string;
        email: string;
      }>(jwtToken);

      // Generate a deterministic UUID v5 based on the numeric ID
      const userId = uuidv5(decodedToken.id, UUID_NAMESPACE);

      const videoEntity = new VideoEntity({
        title: file.filename,
        userEmail: decodedToken.email,
        base64: file.file.toString('base64'),
        userId,
        status: 'processing',
        createdAt: new Date(),
      });

      await this.videoRepository.insert(videoEntity);

      return this.toOutput(videoEntity);
    }

    private toOutput(entity: VideoEntity): VideoOutput {
      return VideoOutputMapper.toOutput(entity);
    }
  }
}
