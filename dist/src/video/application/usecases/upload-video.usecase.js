"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadVideoUseCase = void 0;
const video_output_1 = require("../dtos/video-output");
const bad_request_error_1 = require("../../../shared/application/errors/bad-request-error");
const video_entity_1 = require("../../domain/entities/video.entity");
var UploadVideoUseCase;
(function (UploadVideoUseCase) {
    class UseCase {
        constructor(videoRepository, authService) {
            this.videoRepository = videoRepository;
            this.authService = authService;
        }
        async execute(input) {
            const { file, jwtToken } = input;
            if (!file) {
                throw new bad_request_error_1.BadRequestError('File is missing or invalid');
            }
            const decodedToken = await this.authService.decode(jwtToken);
            const videoEntity = new video_entity_1.VideoEntity({
                title: file.filename,
                userEmail: decodedToken.payload.email,
                base64: file.file.toString('base64'),
                userId: decodedToken.payload.id,
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