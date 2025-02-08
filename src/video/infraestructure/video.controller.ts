import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  HttpCode,
  Query,
  UseGuards,
  Headers,
  Req,
  HttpException,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DeleteProcessedVideoUseCase } from '../application/usecases/delete-processed-video.usecase';
import { RetrieveProcessedVideoUseCase } from '../application/usecases/retrieve-processed-video.usecase';
import { UploadProcessedVideoUseCase } from '../application/usecases/upload-processed-video.usecase';
import { UploadVideoUseCase } from '../application/usecases/upload-video.usecase';
import { ProcessVideoUseCase } from '../application/usecases/process-video.usecase';
import { GetVideoUseCase } from '../application/usecases/get-video.usecase';
import { UpdateVideoUseCase } from '../application/usecases/update-video';
import { ListVideosUseCase } from '../application/usecases/list-videos.usecase';

import { ListVideosDto } from './dtos/list-videos.dto';
import { UpdateVideoDto } from './dtos/update-video.dto';
import { UploadProcessedVideoDto } from './dtos/upload-processed-video.dto';

import {
  VideoCollectionPresenter,
  VideoPresenter,
} from './presenters/video.presenter';
import { VideoOutput } from '../application/dtos/video-output';
import { AuthGuard } from '../../auth/infraestructure/auth.guard';
import { AuthService } from '../../auth/infraestructure/auth.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { FastifyRequest } from 'fastify';

@ApiTags('Videos')
@Controller('videos')
export class VideosController {
  @Inject(DeleteProcessedVideoUseCase.UseCase)
  private deleteProcessedVideoUseCase: DeleteProcessedVideoUseCase.UseCase;

  @Inject(RetrieveProcessedVideoUseCase.UseCase)
  private retrieveProcessedVideoUseCase: RetrieveProcessedVideoUseCase.UseCase;

  @Inject(UploadProcessedVideoUseCase.UseCase)
  private uploadProcessedVideoUseCase: UploadProcessedVideoUseCase.UseCase;

  @Inject(UploadVideoUseCase.UseCase)
  private uploadVideoUseCase: UploadVideoUseCase.UseCase;

  @Inject(ProcessVideoUseCase.UseCase)
  private processVideoUseCase: ProcessVideoUseCase.UseCase;

  @Inject(GetVideoUseCase.UseCase)
  private getVideoUseCase: GetVideoUseCase.UseCase;

  @Inject(UpdateVideoUseCase.UseCase)
  private updateVideoUseCase: UpdateVideoUseCase.UseCase;

  @Inject(ListVideosUseCase.UseCase)
  private listVideosUseCase: ListVideosUseCase.UseCase;

  @Inject(AuthService)
  private authService: AuthService;

  static videoToResponse(output: VideoOutput) {
    return new VideoPresenter(output);
  }

  static listVideosToResponse(output: ListVideosUseCase.Output) {
    return new VideoCollectionPresenter(output);
  }

  @Post('upload')
  @UseGuards(AuthGuard)
  async upload(
    @Req() request: FastifyRequest,
    @Headers() headers: Record<string, string>,
  ) {
    try {
      const data = await request.file();
      const buffer = await data.toBuffer();

      const file: Express.Multer.File = {
        buffer,
        originalname: data.filename,
        mimetype: data.mimetype,
        size: buffer.length,
        fieldname: data.fieldname,
        encoding: '7bit',
        destination: '',
        filename: data.filename,
        path: '',
        stream: null,
      };

      return this.uploadVideoUseCase.execute({
        video: file,
        jwtToken: headers.authorization,
      });
    } catch (error) {
      throw new HttpException(
        'Error processing file upload: ' + error.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @HttpCode(201)
  @Post('upload-processed')
  async uploadProcessed(
    @Body() uploadProcessedVideoDto: UploadProcessedVideoDto,
  ) {
    return this.uploadProcessedVideoUseCase.execute(uploadProcessedVideoDto);
  }

  @ApiBearerAuth()
  @ApiResponse({
    status: 404,
    description: 'Id não encontrado',
  })
  @ApiResponse({
    status: 401,
    description: 'Acesso não autorizado',
  })
  @UseGuards(AuthGuard)
  @Get(':id')
  async getVideo(@Param('id') id: string) {
    const output = await this.getVideoUseCase.execute({ id });
    return VideosController.videoToResponse(output);
  }

  @ApiBearerAuth()
  @ApiResponse({
    status: 404,
    description: 'Id não encontrado',
  })
  @ApiResponse({
    status: 401,
    description: 'Acesso não autorizado',
  })
  @UseGuards(AuthGuard)
  @Get('processed/:id')
  async getProcessedVideo(@Param('id') id: string) {
    await this.retrieveProcessedVideoUseCase.execute({ id });
  }

  @ApiBearerAuth()
  @ApiResponse({
    status: 404,
    description: 'Id não encontrado',
  })
  @ApiResponse({
    status: 401,
    description: 'Acesso não autorizado',
  })
  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteProcessed(@Param('id') id: string) {
    await this.deleteProcessedVideoUseCase.execute({ id });
  }

  @ApiBearerAuth()
  @Get()
  async list(@Query() listVideosDto: ListVideosDto) {
    const output = await this.listVideosUseCase.execute(listVideosDto);
    return VideosController.listVideosToResponse(output);
  }

  @ApiBearerAuth()
  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body() updateVideoDto: UpdateVideoDto,
  ) {
    return this.updateVideoUseCase.execute({ id, ...updateVideoDto });
  }

  @ApiBearerAuth()
  @Post('process/:id')
  async process(@Param('id') id: string) {
    return this.processVideoUseCase.execute({ id });
  }
}
