"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const env_config_service_1 = require("../../shared/infraestructure/env-config/env-config.service");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(jwtService, envConfigService) {
        this.jwtService = jwtService;
        this.envConfigService = envConfigService;
    }
    async generateJwt({ userId, userEmail }) {
        const accessToken = await this.jwtService.signAsync({
            payload: { id: userId, email: userEmail },
            options: {},
        });
        return { accessToken };
    }
    async verifyJwt(token) {
        const payload = await this.jwtService.verifyAsync(token, {
            secret: this.envConfigService.getJwtSecret(),
        });
        return payload;
    }
    async decode(token) {
        return await this.jwtService.decode(token);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        env_config_service_1.EnvConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map