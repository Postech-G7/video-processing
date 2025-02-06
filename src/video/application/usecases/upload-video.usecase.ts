import { VideoRepository } from '../../domain/repositories/video.repository';
import { VideoOutput, VideoOutputMapper } from '../dtos/video-output';
import { BadRequestError } from '../../../shared/application/errors/bad-request-error';
import { UseCase as DefaultUseCase } from '../../../shared/application/providers/usecases/use-case';
import { VideoEntity } from '../../domain/entities/video.entity';
import { AuthService } from 'src/auth/infraestructure/auth.service';
import * as fs from 'fs/promises';
import * as path from 'path';

export namespace UploadVideoUseCase {
  export type Input = {
    file: Express.Multer.File;
    jwtToken: string;
  };

  export type Output = VideoOutput;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private videoRepository: VideoRepository.Repository,
      private authService: AuthService
    ) {}

    async execute(input: Input): Promise<Output> {
      const { file, jwtToken } = input;

      if (!file || !file.buffer) {
        throw new BadRequestError('File is missing or invalid');
      }
      //VALIDAR COMO PEGAR O TOKEN DOS HEADERS
      const decodedToken = await this.authService.verifyJwt<{
        email: string;
        id: string;
      }>(jwtToken);

      // Save file to disk
      const uploadDir = path.join(process.cwd(), 'uploads');
      await fs.mkdir(uploadDir, { recursive: true });
      const fileName = `${Date.now()}-${file.originalname}`;
      const filePath = path.join(uploadDir, fileName);
      await fs.writeFile(filePath, file.buffer);

      const videoEntity = new VideoEntity({
        title: file.originalname,
        userEmail: decodedToken.email,
        path: filePath,
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
