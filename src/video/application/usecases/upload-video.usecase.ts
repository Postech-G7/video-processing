import { VideoRepository } from '../../domain/repositories/video.repository';
import { VideoOutput, VideoOutputMapper } from '../dtos/video-output';
import { BadRequestError } from '../../../shared/application/errors/bad-request-error';
import { UseCase as DefaultUseCase } from '../../../shared/application/providers/usecases/use-case';
import { VideoEntity } from '../../domain/entities/video.entity';
import { AuthService } from 'src/auth/infraestructure/auth.service';
import { cloudStorage } from '../../../shared/infraestructure/storage/config/cloud-storage.config';

export namespace UploadVideoUseCase {
  export type Input = {
    video: Express.Multer.File;
    jwtToken: string;
  };

  export type Output = VideoOutput;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private videoRepository: VideoRepository.Repository,
      private authService: AuthService,
    ) {}

    async execute(input: Input): Promise<VideoOutput> {
      const { video: file, jwtToken } = input;

      if (!file || !file.buffer) {
        throw new BadRequestError('File is missing or invalid');
      }
      //VALIDAR COMO PEGAR O TOKEN DOS HEADERS
      const token = jwtToken.replace('Bearer ', '');
      const decodedToken = await this.authService.verifyJwt<{
        id: string;
        email: string;
        iat: number;
        exp: number;
      }>(token);
      console.log(decodedToken);

      // Save file to GCP bucket
      const fileName = `videos/${Date.now()}-${file.originalname}`;
      const fileBuffer = file.buffer;
      const bucket = cloudStorage;
      const blob = bucket.file(fileName);
      await blob.save(fileBuffer, {
        contentType: file.mimetype,
      });

      const videoEntity = new VideoEntity({
        title: file.originalname,
        userEmail: decodedToken.email,
        path: fileName, // Store the GCP path instead of local path
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
