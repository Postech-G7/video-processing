import { Test } from '@nestjs/testing';
import { AuthModule } from './auth.module';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { EnvConfigService } from '../../shared/infraestructure/env-config/env-config.service';

describe('AuthModule', () => {
  it('should compile the module and provide all dependencies', async () => {
    const module = await Test.createTestingModule({
      imports: [AuthModule],
    }).compile();

    expect(module).toBeDefined();

    // Verifica se todos os provedores estão disponíveis no contexto
    const authService = module.get<AuthService>(AuthService);
    const jwtService = module.get<JwtService>(JwtService);
    const envConfigService = module.get<EnvConfigService>(EnvConfigService);

    expect(authService).toBeInstanceOf(AuthService);
    expect(jwtService).toBeInstanceOf(JwtService);
    expect(envConfigService).toBeInstanceOf(EnvConfigService);
  });
});
