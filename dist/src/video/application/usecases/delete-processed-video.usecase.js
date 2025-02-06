"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteProcessedVideoUseCase = void 0;
const bad_request_error_1 = require("../../../shared/application/errors/bad-request-error");
var DeleteProcessedVideoUseCase;
(function (DeleteProcessedVideoUseCase) {
    class UseCase {
        constructor(storageService, videoRepository) {
            this.storageService = storageService;
            this.videoRepository = videoRepository;
        }
        async execute(input) {
            if (!input?.id) {
                throw new bad_request_error_1.BadRequestError('Input data not provided');
            }
            const video = await this.videoRepository.findById(input.id);
            const videoFileName = `${video.id}.zip`;
            await this.storageService.delete(videoFileName);
            await this.videoRepository.delete(input.id);
        }
    }
    DeleteProcessedVideoUseCase.UseCase = UseCase;
})(DeleteProcessedVideoUseCase || (exports.DeleteProcessedVideoUseCase = DeleteProcessedVideoUseCase = {}));
//# sourceMappingURL=delete-processed-video.usecase.js.map