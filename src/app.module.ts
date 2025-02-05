import { Module } from '@nestjs/common';
import { EnvConfigModule } from './shared/infraestructure/env-config/env-config.module';
import { DatabaseModule } from './shared/infraestructure/database/database.module';
import { AuthModule } from './auth/infraestructure/auth.module';
import { VideoModule } from './video/infraestructure/video.module';

@Module({
  imports: [EnvConfigModule, DatabaseModule, AuthModule, VideoModule],
})
export class AppModule {}
