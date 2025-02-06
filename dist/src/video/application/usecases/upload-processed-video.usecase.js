"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadProcessedVideoUseCase = void 0;
const bad_request_error_1 = require("../../../shared/application/errors/bad-request-error");
var UploadProcessedVideoUseCase;
(function (UploadProcessedVideoUseCase) {
    class UseCase {
        constructor(storageService, videoRepository) {
            this.storageService = storageService;
            this.videoRepository = videoRepository;
        }
        async execute(input) {
            if (!input?.file || !input?.destination) {
                throw new bad_request_error_1.BadRequestError('Input data not provided');
            }
            await this.storageService.upload(input.file, input.destination);
            const videoEntity = await this.videoRepository.findById(input.id);
            videoEntity.updateStatus('completed');
        }
    }
    UploadProcessedVideoUseCase.UseCase = UseCase;
})(UploadProcessedVideoUseCase || (exports.UploadProcessedVideoUseCase = UploadProcessedVideoUseCase = {}));
//# sourceMappingURL=upload-processed-video.usecase.js.map