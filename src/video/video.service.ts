import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateVideoDto } from './dto/create-video.dto';
import { CreateImagesFromVideoDto } from './dto/create-images-from-video.dto';
import * as ffmpeg from 'fluent-ffmpeg';
import * as archiver from 'archiver';
import * as fs from 'fs-extra';
import { join } from 'path';
import { Video, VideoDocument } from './schemas/video.schema';

@Injectable()
export class VideoService {
  constructor(
    @InjectModel(Video.name) private readonly videoModel: Model<VideoDocument>,
  ) {}

  async findById(id: string) {
    return await this.videoModel.findById(id).exec();
  }

  async create(createVideoDto: CreateVideoDto) {
    const createdVideo = new this.videoModel(createVideoDto);
    return await createdVideo.save();
  }

  async createImagesFromVideo(
    createImagesFromVideoDto: CreateImagesFromVideoDto,
  ) {
    try {
      // Find the video document by user_id
      const video = await this.videoModel.findOne({
        user_id: createImagesFromVideoDto.user_id,
      });
      if (!video) {
        throw new Error('Video not found');
      }

      // Create temporary directories
      const tempDir = join(process.cwd(), 'temp', createImagesFromVideoDto._id.toString());
      const framesDir = join(tempDir, 'frames');
      await fs.ensureDir(framesDir);

      // Write base64 video to temporary file
      const videoPath = join(tempDir, 'video.mp4');
      await fs.writeFile(videoPath, video.base64, 'base64');

      // Extract frames using fluent-ffmpeg
      await new Promise<void>((resolve, reject) => {
        ffmpeg(videoPath)
          .on('end', () => resolve())
          .on('error', (err) => reject(err))
          .screenshots({
            count: 10,
            folder: framesDir,
            filename: 'frame-%d.jpg',
            size: '1280x720',
          });
      });

      // Create zip file
      const zipPath = join(tempDir, 'frames.zip');
      const output = fs.createWriteStream(zipPath);
      const archive = archiver('zip', { zlib: { level: 9 } });

      await new Promise<void>((resolve, reject) => {
        output.on('close', () => resolve());
        archive.on('error', (err) => reject(err));
        archive.pipe(output);
        archive.directory(framesDir, false);
        archive.finalize();
      });

      // Read zip file as base64
      const zipContent = await fs.readFile(zipPath, { encoding: 'base64' });

      // Clean up temporary files
      await fs.remove(tempDir);

      return {
        success: true,
        zipBase64: zipContent,
      };
    } catch (error) {
      throw new Error(`Failed to process video: ${error.message}`);
    }
  }
}
