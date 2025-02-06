"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const env_config_module_1 = require("./shared/infraestructure/env-config/env-config.module");
const database_module_1 = require("./shared/infraestructure/database/database.module");
const auth_module_1 = require("./auth/infraestructure/auth.module");
const video_module_1 = require("./video/infraestructure/video.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [env_config_module_1.EnvConfigModule, database_module_1.DatabaseModule, auth_module_1.AuthModule, video_module_1.VideoModule],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map