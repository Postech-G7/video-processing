"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadVideoUseCase = void 0;
const video_output_1 = require("../dtos/video-output");
const bad_request_error_1 = require("../../../shared/application/errors/bad-request-error");
const video_entity_1 = require("../../domain/entities/video.entity");
const cloud_storage_config_1 = require("../../../shared/infraestructure/storage/config/cloud-storage.config");
var UploadVideoUseCase;
(function (UploadVideoUseCase) {
    class UseCase {
        constructor(videoRepository, authService) {
            this.videoRepository = videoRepository;
            this.authService = authService;
        }
        async execute(input) {
            const { video: file, jwtToken } = input;
            if (!file || !file.buffer) {
                throw new bad_request_error_1.BadRequestError('File is missing or invalid');
            }
            const token = jwtToken.replace('Bearer ', '');
            const decodedToken = await this.authService.verifyJwt(token);
            console.log(decodedToken);
            const fileName = `videos/${Date.now()}-${file.originalname}`;
            const fileBuffer = file.buffer;
            const bucket = cloud_storage_config_1.cloudStorage;
            const blob = bucket.file(fileName);
            await blob.save(fileBuffer, {
                contentType: file.mimetype,
            });
            const videoEntity = new video_entity_1.VideoEntity({
                title: file.originalname,
                userEmail: decodedToken.email,
                path: fileName,
                status: 'processing',
                createdAt: new Date(),
            });
            await this.videoRepository.insert(videoEntity);
            return this.toOutput(videoEntity);
        }
        toOutput(entity) {
            return video_output_1.VideoOutputMapper.toOutput(entity);
        }
    }
    UploadVideoUseCase.UseCase = UseCase;
})(UploadVideoUseCase || (exports.UploadVideoUseCase = UploadVideoUseCase = {}));
//# sourceMappingURL=upload-video.usecase.js.map