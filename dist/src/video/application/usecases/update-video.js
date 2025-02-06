"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateVideoUseCase = void 0;
const bad_request_error_1 = require("../../../shared/application/errors/bad-request-error");
const invalid_password_error_1 = require("../../../shared/application/errors/invalid-password-error");
const video_output_1 = require("../dtos/video-output");
var UpdateVideoUseCase;
(function (UpdateVideoUseCase) {
    class UseCase {
        constructor(videoRepository) {
            this.videoRepository = videoRepository;
        }
        async execute(input) {
            const { id, status } = input;
            if (!id) {
                throw new bad_request_error_1.BadRequestError('Input data not provided');
            }
            if (!status) {
                throw new invalid_password_error_1.InvalidPasswordError('Status must be provided');
            }
            const videoEntity = await this.videoRepository.findById(id);
            videoEntity.updateStatus(status);
            await this.videoRepository.update(videoEntity);
            return this.toOutput(videoEntity);
        }
        toOutput(entity) {
            return video_output_1.VideoOutputMapper.toOutput(entity);
        }
    }
    UpdateVideoUseCase.UseCase = UseCase;
})(UpdateVideoUseCase || (exports.UpdateVideoUseCase = UpdateVideoUseCase = {}));
//# sourceMappingURL=update-video.js.map