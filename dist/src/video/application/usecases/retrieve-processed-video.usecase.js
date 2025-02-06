"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RetrieveProcessedVideoUseCase = void 0;
const bad_request_error_1 = require("../../../shared/application/errors/bad-request-error");
var RetrieveProcessedVideoUseCase;
(function (RetrieveProcessedVideoUseCase) {
    class UseCase {
        constructor(storageService, videoRepository) {
            this.storageService = storageService;
            this.videoRepository = videoRepository;
        }
        async execute(input) {
            if (!input?.id) {
                throw new bad_request_error_1.BadRequestError('Input data not provided');
            }
            const videoEntity = await this.videoRepository.findById(input.id);
            await this.storageService.download(input.id);
            videoEntity.updateStatus('retrieved');
        }
    }
    RetrieveProcessedVideoUseCase.UseCase = UseCase;
})(RetrieveProcessedVideoUseCase || (exports.RetrieveProcessedVideoUseCase = RetrieveProcessedVideoUseCase = {}));
//# sourceMappingURL=retrieve-processed-video.usecase.js.map