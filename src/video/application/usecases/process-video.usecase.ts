/* eslint-disable prettier/prettier */
import { VideoRepository } from '../../domain/repositories/video.repository';
import { UseCase as DefaultUseCase } from '../../../shared/application/providers/usecases/use-case';
import ffmpeg from 'fluent-ffmpeg';
import * as fs from 'fs';
import * as path from 'path';
import AdmZip from 'adm-zip';
import { BadRequestError } from '../../../shared/application/errors/bad-request-error';
import { upload, cloudStorage, download } from '../../../shared/infraestructure/storage/config/cloud-storage.config';

export namespace ProcessVideoUseCase {
  export type Input = {
    id: string;
  };

  export type Output = {
    zipUrl: string;
  };

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private videoRepository: VideoRepository.Repository,
    ) {}

    private async createTempDir(id: string): Promise<string> {
      const tempDir = path.join(process.cwd(), 'temp', id);
      await fs.promises.mkdir(tempDir, { recursive: true });
      return tempDir;
    }

    private async processVideo(videoPath: string, outputDir: string): Promise<string[]> {
      return new Promise((resolve, reject) => {
        const screenshots: string[] = [];
        ffmpeg(videoPath)
          .on('end', () => resolve(screenshots))
          .on('error', (err) => reject(err))
          // @ts-ignore - ffmpeg-fluent types are incomplete
          .on('screenshot', (filename: string) => {
            screenshots.push(path.join(outputDir, filename));
          })
          .screenshots({
            count: 3,
            folder: outputDir,
            filename: 'screenshot-%i.png',
          });
      });
    }

    private async createZipFile(screenshots: string[], outputDir: string): Promise<string> {
      const zip = new AdmZip();
      screenshots.forEach((screenshot) => {
        zip.addLocalFile(screenshot);
      });
      const zipPath = path.join(outputDir, 'screenshots.zip');
      zip.writeZip(zipPath);
      return zipPath;
    }

    private cleanup(tempDir: string): void {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }

    async execute(input: Input): Promise<Output> {
      const { id } = input;

      const video = await this.videoRepository.findById(id);
      if (!video) {
        throw new BadRequestError('Video not found');
      }

      const tempDir = await this.createTempDir(id);
      const videoPath = path.join(tempDir, path.basename(video.path));

      try {
        // Download video file from GCP bucket
        const videoBuffer = await download(video.path);
        await fs.promises.writeFile(videoPath, videoBuffer);

        // Process video and generate screenshots
        const screenshots = await this.processVideo(videoPath, tempDir);

        // Create zip file with screenshots
        const zipPath = await this.createZipFile(screenshots, tempDir);
        
        // Upload zip file to GCS
        const destination = `screenshots/${id}/screenshots.zip`;
        const zipUrl = await upload(zipPath, destination);
        const url = `https://storage.googleapis.com/processed-videos-fiap/${destination}`;

        // Update video status to processed
        video.updateStatus('completed');
        await this.videoRepository.update(video);

        // Cleanup temporary files
        this.cleanup(tempDir);

        return { zipUrl: url };
      } catch (error) {
        // Cleanup on error
        this.cleanup(tempDir);
        video.updateStatus('failed');
        await this.videoRepository.update(video);
        throw error;
      }
    }
  }
}
