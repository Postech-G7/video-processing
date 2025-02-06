import { VideoOutput } from '../../application/dtos/video-output';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class VideoPresenter {
  @ApiProperty({
    description: 'ID do vídeo',
  })
  id: string;

  @ApiProperty({
    description: 'Descrição do vídeo',
  })
  title: string;

  @ApiProperty({
    description: 'E-mail do usuário',
  })
  userEmail: string;

  @ApiProperty({
    description: 'Status do processamento do vídeo',
  })
  status: string;

  @ApiProperty({
    description: 'Caminho do vídeo',
  })
  path: string;

  @ApiProperty({
    description: 'Data de criação do vídeo',
  })
  @Transform(({ value }: { value: Date }) => value.toISOString())
  createdAt: Date;

  constructor(output: VideoOutput) {
    this.id = output.id;
    this.title = output.title;
    this.userEmail = output.userEmail;
    this.status = output.status;
    this.path = output.path;
    this.createdAt = output.createdAt;
  }
}

export class VideoCollectionPresenter {
  data: VideoPresenter[];
  meta: {
    total: number;
    currentPage: number;
    perPage: number;
    lastPage: number;
  };

  constructor(output: any) {
    this.data = output.items.map(item => new VideoPresenter(item));
    this.meta = {
      total: output.total,
      currentPage: output.currentPage,
      perPage: output.perPage,
      lastPage: Math.ceil(output.total / output.perPage),
    };
  }
}
