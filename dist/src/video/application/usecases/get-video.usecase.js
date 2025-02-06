"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetVideoUseCase = void 0;
const video_output_1 = require("../dtos/video-output");
const bad_request_error_1 = require("../../../shared/application/errors/bad-request-error");
var GetVideoUseCase;
(function (GetVideoUseCase) {
    class UseCase {
        constructor(videoRepository) {
            this.videoRepository = videoRepository;
        }
        async execute(input) {
            const { id } = input;
            if (!id) {
                throw new bad_request_error_1.BadRequestError('Input data not provided');
            }
            const videoEntity = await this.videoRepository.findById(id);
            return this.toOutput(videoEntity);
        }
        toOutput(entity) {
            return video_output_1.VideoOutputMapper.toOutput(entity);
        }
    }
    GetVideoUseCase.UseCase = UseCase;
})(GetVideoUseCase || (exports.GetVideoUseCase = GetVideoUseCase = {}));
//# sourceMappingURL=get-video.usecase.js.map