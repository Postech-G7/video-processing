import { Injectable } from '@nestjs/common';
import { UploadVideoDto } from './dtos/upload-video.dto';
import { UploadProcessedVideoDto } from './dtos/upload-processed-video.dto';

@Injectable()
export class VideoService {
  create(createVideoDto: UploadVideoDto) {
    return 'This action adds a new video';
  }

  findAll() {
    return `This action returns all video`;
  }

  findOne(id: number) {
    return `This action returns a #${id} video`;
  }

  update(id: number, updateVideoDto: UploadProcessedVideoDto) {
    return `This action updates a #${id} video`;
  }

  remove(id: number) {
    return `This action removes a #${id} video`;
  }
}
