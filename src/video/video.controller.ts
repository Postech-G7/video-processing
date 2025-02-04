import { Controller, Post, Body } from '@nestjs/common';
import { VideoService } from './video.service';
import { CreateImagesFromVideoDto } from './dto/create-images-from-video.dto';
@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post('images')
  async createImages(
    @Body() createImagesFromVideoDto: CreateImagesFromVideoDto,
  ) {
    return await this.videoService.createImagesFromVideo(
      createImagesFromVideoDto,
    );
  }
}
