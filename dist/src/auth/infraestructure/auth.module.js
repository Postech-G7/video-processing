"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const jwt_1 = require("@nestjs/jwt");
const env_config_module_1 = require("../../shared/infraestructure/env-config/env-config.module");
const env_config_service_1 = require("../../shared/infraestructure/env-config/env-config.service");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            env_config_module_1.EnvConfigModule,
            jwt_1.JwtModule.registerAsync({
                imports: [env_config_module_1.EnvConfigModule],
                useFactory: async (configService) => ({
                    global: true,
                    secret: configService.getJwtSecret(),
                    signOptions: { expiresIn: configService.getJwtExpiresInSeconds() },
                }),
                inject: [env_config_service_1.EnvConfigService],
            }),
        ],
        providers: [auth_service_1.AuthService],
        exports: [auth_service_1.AuthService],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map