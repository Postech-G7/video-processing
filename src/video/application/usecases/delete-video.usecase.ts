import { VideoRepository } from '../../domain/repositories/video.repository';
import { BadRequestError } from '../../../shared/application/errors/bad-request-error';
import { UseCase as DefaultUseCase } from '../../../shared/application/providers/usecases/use-case';
import { GoogleCloudStorageService } from '../../../shared/infraestructure/storage/implementations/google-cloud-storage';

export namespace DeleteProcessedVideoUseCase {
  export type Input = {
    id: string;
  };

  export type Output = void;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private readonly storageService: GoogleCloudStorageService,
      private readonly videoRepository: VideoRepository.Repository,
    ) {}

    async execute(input: Input): Promise<void> {
      const { id } = input;

      if (!id) {
        throw new BadRequestError('Input data not provided');
      }

      // Get the video to find its storage path
      const video = await this.videoRepository.findById(id);
      
      // Delete from storage if there's a processed video
      if (video.processedVideoUrl) {
        await this.storageService.delete(video.processedVideoUrl);
      }

      // Delete from database
      await this.videoRepository.delete(id);
    }
  }
}
