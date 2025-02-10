/* eslint-disable @typescript-eslint/no-unused-vars */
import { VideoRepository } from '../../domain/repositories/video.repository';
import { UseCase as DefaultUseCase } from '../../../shared/application/providers/usecases/use-case';
import ffmpeg from 'fluent-ffmpeg';
import * as fs from 'fs';
import * as path from 'path';
import archiver from 'archiver';
import { VideoOutput, VideoOutputMapper } from '../dtos/video-output';
import { NotFoundError } from '../../../shared/domain/errors/not-found-error';
import { GoogleCloudStorageService } from '../../../shared/infraestructure/storage/implementations/google-cloud-storage';
import { ServerError } from '../../../shared/domain/errors/server-error';
import { SendMessageUseCase } from './send-message.usecase';

export namespace ProcessVideoUseCase {
  export type Input = {
    id: string;
  };

  export type Output = VideoOutput;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private videoRepository: VideoRepository.Repository,
      private storageService: GoogleCloudStorageService,
    ) {}

    private createTempDir(id: string): string {
      const tempDir = path.join(process.cwd(), 'processed-videos', id);

      try {
        if (fs.existsSync(tempDir)) {
          console.log(`Directory already exists: ${tempDir}`);
        } else {
          fs.mkdirSync(tempDir, { recursive: true });
          console.log(`Created directory: ${tempDir}`);
        }
      } catch (error) {
        console.error(`Failed to create directory: ${tempDir}`, error);
        throw error;
      }

      return tempDir;
    }

    private async processVideo(
      videoPath: string,
      outputDir: string,
    ): Promise<string[]> {
      return new Promise((resolve, reject) => {
        console.log(`Processing video at path: ${videoPath}`);
        console.log(`Output directory for screenshots: ${outputDir}`);

        let screenshotFiles: string[] = [];

        ffmpeg(videoPath)
          .on('filenames', (filenames) => {
            console.log('Screenshots filenames:', filenames);
            screenshotFiles = filenames.map((filename) =>
              path.join(outputDir, filename),
            );
          })
          .on('end', function () {
            console.log('FFmpeg processing finished');
            console.log('Screenshot files:', screenshotFiles);
            resolve(screenshotFiles);
          })
          .on('error', function (err) {
            console.error('FFmpeg error:', err);
            reject(err);
          })
          .screenshots({
            count: 30,
            folder: outputDir,
            filename: 'screenshot-%i.png',
          });
      });
    }

    private async createZipFile(
      screenshots: string[],
      outputDir: string,
    ): Promise<string> {
      const zipPath = path.join(outputDir, 'screenshots.zip');

      if (fs.existsSync(zipPath)) {
        fs.unlinkSync(zipPath);
        console.log(`Deleted existing zip file: ${zipPath}`);
      }

      // Verify that all screenshot files exist
      console.log('Verifying screenshot files before zipping...');
      screenshots.forEach((screenshot) => {
        if (!fs.existsSync(screenshot)) {
          throw new Error(`Screenshot file not found: ${screenshot}`);
        }
        const stats = fs.statSync(screenshot);
        console.log(`Found screenshot: ${screenshot} (${stats.size} bytes)`);
      });

      const output = fs.createWriteStream(zipPath);
      const archive = archiver('zip', { zlib: { level: 9 } });

      return new Promise((resolve, reject) => {
        output.on('close', () => {
          try {
            // Verify the zip file exists and has content
            const stats = fs.statSync(zipPath);
            console.log(`Zip file created at: ${zipPath}`);
            console.log(`Zip file size: ${stats.size} bytes`);

            if (stats.size === 0) {
              reject(new Error('Created zip file is empty'));
              return;
            }

            // Verify zip file contains all screenshots
            const zip = require('adm-zip');
            const zipFile = new zip(zipPath);
            const entries = zipFile.getEntries();
            console.log(`Zip file contains ${entries.length} entries`);

            if (entries.length !== screenshots.length) {
              reject(
                new Error(
                  `Zip file contains ${entries.length} files but expected ${screenshots.length}`,
                ),
              );
              return;
            }

            resolve(zipPath);
          } catch (error) {
            console.error('Error verifying zip file:', error);
            reject(error);
          }
        });

        archive.on('error', (err) => {
          console.error('Archive error:', err);
          reject(err);
        });

        archive.on('entry', (entry) => {
          console.log(`Added to zip: ${entry.name}`);
        });

        archive.pipe(output);

        screenshots.forEach((screenshot) => {
          archive.file(screenshot, { name: path.basename(screenshot) });
        });

        archive.finalize();
      });
    }

    async execute(input: Input): Promise<Output> {
      const { id } = input;

      const video = await this.videoRepository.findById(id);
      if (!video) {
        throw new NotFoundError('Video not found');
      }

      const tempDir = this.createTempDir(id);

      const videoPath = path.join(tempDir, 'video.mp4');

      try {
        const videoBuffer = Buffer.from(video.base64, 'base64');
        fs.writeFileSync(videoPath, videoBuffer);
        const screenshots = await this.processVideo(videoPath, tempDir);

        const zipPath = await this.createZipFile(screenshots, tempDir);

        const zipUrl = await this.storageService.upload(
          zipPath,
          `processed-${id}/`,
        );
        video.updateStatus('completed');
        video.updateVideoUrl(zipUrl);
        await this.videoRepository.update(video);
        // this.cleanup(tempDir);
        return VideoOutputMapper.toOutput(video);
      } catch (error) {
        // this.cleanup(tempDir);
        video.updateStatus('failed');
        await this.videoRepository.update(video);

        //ENVIAR MENSAGEM PARA CLIENTE
        await SendMessageUseCase.execute({
          videoId: video.id,
          status: 'failed',
          email: video.userEmail,
        });

        throw new ServerError('Failed to process video');
      }
    }
  }
}
