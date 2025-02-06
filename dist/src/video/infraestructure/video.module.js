"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoModule = void 0;
const common_1 = require("@nestjs/common");
const video_controller_1 = require("./video.controller");
const video_prisma_repository_1 = require("./database/prisma/repositories/video-prisma.repository");
const auth_module_1 = require("../../auth/infraestructure/auth.module");
const prisma_service_1 = require("../../shared/infraestructure/database/prisma/prisma.service");
const delete_processed_video_usecase_1 = require("../application/usecases/delete-processed-video.usecase");
const retrieve_processed_video_usecase_1 = require("../application/usecases/retrieve-processed-video.usecase");
const upload_processed_video_usecase_1 = require("../application/usecases/upload-processed-video.usecase");
const upload_video_usecase_1 = require("../application/usecases/upload-video.usecase");
const process_video_usecase_1 = require("../application/usecases/process-video.usecase");
const get_video_usecase_1 = require("../application/usecases/get-video.usecase");
const list_videos_usecase_1 = require("../application/usecases/list-videos.usecase");
const google_cloud_storage_1 = require("../../shared/infraestructure/storage/implementations/google-cloud-storage");
const update_video_1 = require("../application/usecases/update-video");
let VideoModule = class VideoModule {
};
exports.VideoModule = VideoModule;
exports.VideoModule = VideoModule = __decorate([
    (0, common_1.Module)({
        imports: [auth_module_1.AuthModule],
        controllers: [video_controller_1.VideosController],
        providers: [
            { provide: 'PrismaService', useClass: prisma_service_1.PrismaService },
            {
                provide: 'VideoRepository',
                useFactory: (prismaService) => new video_prisma_repository_1.VideoPrismaRepository(prismaService),
                inject: ['PrismaService'],
            },
            { provide: 'StorageService', useClass: google_cloud_storage_1.GoogleCloudStorageService },
            {
                provide: delete_processed_video_usecase_1.DeleteProcessedVideoUseCase.UseCase,
                useFactory: (videoRepository, storageService) => {
                    return new delete_processed_video_usecase_1.DeleteProcessedVideoUseCase.UseCase(storageService, videoRepository);
                },
                inject: ['VideoRepository', 'StorageService'],
            },
            {
                provide: retrieve_processed_video_usecase_1.RetrieveProcessedVideoUseCase.UseCase,
                useFactory: (videoRepository, storageService) => {
                    return new retrieve_processed_video_usecase_1.RetrieveProcessedVideoUseCase.UseCase(storageService, videoRepository);
                },
                inject: ['VideoRepository'],
            },
            {
                provide: upload_processed_video_usecase_1.UploadProcessedVideoUseCase.UseCase,
                useFactory: (videoRepository, storageService) => {
                    return new upload_processed_video_usecase_1.UploadProcessedVideoUseCase.UseCase(storageService, videoRepository);
                },
                inject: ['VideoRepository', 'StorageService'],
            },
            {
                provide: upload_video_usecase_1.UploadVideoUseCase.UseCase,
                useFactory: (videoRepository, authService) => {
                    return new upload_video_usecase_1.UploadVideoUseCase.UseCase(videoRepository, authService);
                },
                inject: ['VideoRepository'],
            },
            {
                provide: process_video_usecase_1.ProcessVideoUseCase.UseCase,
                useFactory: (videoRepository) => {
                    return new process_video_usecase_1.ProcessVideoUseCase.UseCase(videoRepository);
                },
                inject: ['VideoRepository'],
            },
            {
                provide: get_video_usecase_1.GetVideoUseCase.UseCase,
                useFactory: (videoRepository) => {
                    return new get_video_usecase_1.GetVideoUseCase.UseCase(videoRepository);
                },
                inject: ['VideoRepository'],
            },
            {
                provide: update_video_1.UpdateVideoUseCase.UseCase,
                useFactory: (videoRepository) => {
                    return new update_video_1.UpdateVideoUseCase.UseCase(videoRepository);
                },
                inject: ['VideoRepository'],
            },
            {
                provide: list_videos_usecase_1.ListVideosUseCase.UseCase,
                useFactory: (videoRepository) => {
                    return new list_videos_usecase_1.ListVideosUseCase.UseCase(videoRepository);
                },
                inject: ['VideoRepository'],
            },
        ],
    })
], VideoModule);
//# sourceMappingURL=video.module.js.map