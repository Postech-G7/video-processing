import { EnvConfigService } from '../../shared/infraestructure/env-config/env-config.service';
import { JwtService } from '@nestjs/jwt';
type GenerateJwtProps = {
    accessToken: string;
};
export declare class AuthService {
    private jwtService;
    private envConfigService;
    constructor(jwtService: JwtService, envConfigService: EnvConfigService);
    generateJwt({ userId, userEmail }: {
        userId: string;
        userEmail: string;
    }): Promise<GenerateJwtProps>;
    verifyJwt<T>(token: string): Promise<T>;
    decode<T>(token: string): Promise<T>;
}
export {};
