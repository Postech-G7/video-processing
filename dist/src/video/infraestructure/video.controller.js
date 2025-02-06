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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var VideosController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideosController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const delete_processed_video_usecase_1 = require("../application/usecases/delete-processed-video.usecase");
const retrieve_processed_video_usecase_1 = require("../application/usecases/retrieve-processed-video.usecase");
const upload_processed_video_usecase_1 = require("../application/usecases/upload-processed-video.usecase");
const upload_video_usecase_1 = require("../application/usecases/upload-video.usecase");
const process_video_usecase_1 = require("../application/usecases/process-video.usecase");
const get_video_usecase_1 = require("../application/usecases/get-video.usecase");
const update_video_1 = require("../application/usecases/update-video");
const list_videos_usecase_1 = require("../application/usecases/list-videos.usecase");
const list_videos_dto_1 = require("./dtos/list-videos.dto");
const update_video_dto_1 = require("./dtos/update-video.dto");
const upload_processed_video_dto_1 = require("./dtos/upload-processed-video.dto");
const upload_video_dto_1 = require("./dtos/upload-video.dto");
const video_presenter_1 = require("./presenters/video.presenter");
const auth_service_1 = require("../../auth/infraestructure/auth.service");
const auth_guard_1 = require("../../auth/infraestructure/auth.guard");
const swagger_1 = require("@nestjs/swagger");
const platform_express_1 = require("@nestjs/platform-express");
let VideosController = VideosController_1 = class VideosController {
    static videoToResponse(output) {
        return new video_presenter_1.VideoPresenter(output);
    }
    static listVideosToResponse(output) {
        return new video_presenter_1.VideoCollectionPresenter(output);
    }
    async upload(uploadVideoDto) {
        return this.uploadVideoUseCase.execute(uploadVideoDto);
    }
    async uploadProcessed(uploadProcessedVideoDto) {
        return this.uploadProcessedVideoUseCase.execute(uploadProcessedVideoDto);
    }
    async getVideo(id) {
        const output = await this.getVideoUseCase.execute({ id });
        return VideosController_1.videoToResponse(output);
    }
    async getProcessedVideo(id) {
        await this.retrieveProcessedVideoUseCase.execute({ id });
    }
    async deleteProcessed(id) {
        await this.deleteProcessedVideoUseCase.execute({ id });
    }
    async list(listVideosDto) {
        const output = await this.listVideosUseCase.execute(listVideosDto);
        return VideosController_1.listVideosToResponse(output);
    }
    async updateStatus(id, updateVideoDto) {
        return this.updateVideoUseCase.execute({ id, ...updateVideoDto });
    }
    async process(id) {
        return this.processVideoUseCase.execute({ id });
    }
    async uploadAndProcess(file) {
        const uploadResult = await this.uploadVideoUseCase.execute({
            file,
            jwtToken: 'dummy-token',
        });
        return this.processVideoUseCase.execute({ id: uploadResult.id });
    }
};
exports.VideosController = VideosController;
__decorate([
    (0, common_1.Inject)(delete_processed_video_usecase_1.DeleteProcessedVideoUseCase.UseCase),
    __metadata("design:type", delete_processed_video_usecase_1.DeleteProcessedVideoUseCase.UseCase)
], VideosController.prototype, "deleteProcessedVideoUseCase", void 0);
__decorate([
    (0, common_1.Inject)(retrieve_processed_video_usecase_1.RetrieveProcessedVideoUseCase.UseCase),
    __metadata("design:type", retrieve_processed_video_usecase_1.RetrieveProcessedVideoUseCase.UseCase)
], VideosController.prototype, "retrieveProcessedVideoUseCase", void 0);
__decorate([
    (0, common_1.Inject)(upload_processed_video_usecase_1.UploadProcessedVideoUseCase.UseCase),
    __metadata("design:type", upload_processed_video_usecase_1.UploadProcessedVideoUseCase.UseCase)
], VideosController.prototype, "uploadProcessedVideoUseCase", void 0);
__decorate([
    (0, common_1.Inject)(upload_video_usecase_1.UploadVideoUseCase.UseCase),
    __metadata("design:type", upload_video_usecase_1.UploadVideoUseCase.UseCase)
], VideosController.prototype, "uploadVideoUseCase", void 0);
__decorate([
    (0, common_1.Inject)(process_video_usecase_1.ProcessVideoUseCase.UseCase),
    __metadata("design:type", process_video_usecase_1.ProcessVideoUseCase.UseCase)
], VideosController.prototype, "processVideoUseCase", void 0);
__decorate([
    (0, common_1.Inject)(get_video_usecase_1.GetVideoUseCase.UseCase),
    __metadata("design:type", get_video_usecase_1.GetVideoUseCase.UseCase)
], VideosController.prototype, "getVideoUseCase", void 0);
__decorate([
    (0, common_1.Inject)(update_video_1.UpdateVideoUseCase.UseCase),
    __metadata("design:type", update_video_1.UpdateVideoUseCase.UseCase)
], VideosController.prototype, "updateVideoUseCase", void 0);
__decorate([
    (0, common_1.Inject)(list_videos_usecase_1.ListVideosUseCase.UseCase),
    __metadata("design:type", list_videos_usecase_1.ListVideosUseCase.UseCase)
], VideosController.prototype, "listVideosUseCase", void 0);
__decorate([
    (0, common_1.Inject)(auth_service_1.AuthService),
    __metadata("design:type", auth_service_1.AuthService)
], VideosController.prototype, "authService", void 0);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.HttpCode)(201),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Acesso não autorizado',
    }),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)('upload'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [upload_video_dto_1.UploadVideoDto]),
    __metadata("design:returntype", Promise)
], VideosController.prototype, "upload", null);
__decorate([
    (0, common_1.HttpCode)(201),
    (0, common_1.Post)('upload-processed'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [upload_processed_video_dto_1.UploadProcessedVideoDto]),
    __metadata("design:returntype", Promise)
], VideosController.prototype, "uploadProcessed", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Id não encontrado',
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Acesso não autorizado',
    }),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: 200, type: require("./presenters/video.presenter").VideoPresenter }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VideosController.prototype, "getVideo", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Id não encontrado',
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Acesso não autorizado',
    }),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)('processed/:id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VideosController.prototype, "getProcessedVideo", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Id não encontrado',
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Acesso não autorizado',
    }),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Delete)(':id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VideosController.prototype, "deleteProcessed", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: require("./presenters/video.presenter").VideoCollectionPresenter }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [list_videos_dto_1.ListVideosDto]),
    __metadata("design:returntype", Promise)
], VideosController.prototype, "list", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Patch)(':id/status'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_video_dto_1.UpdateVideoDto]),
    __metadata("design:returntype", Promise)
], VideosController.prototype, "updateStatus", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)('process/:id'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VideosController.prototype, "process", null);
__decorate([
    (0, common_1.Post)('upload-and-process'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], VideosController.prototype, "uploadAndProcess", null);
exports.VideosController = VideosController = VideosController_1 = __decorate([
    (0, swagger_1.ApiTags)('Videos'),
    (0, common_1.Controller)('videos')
], VideosController);
//# sourceMappingURL=video.controller.js.map