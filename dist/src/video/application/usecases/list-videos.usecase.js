"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListVideosUseCase = void 0;
const video_repository_1 = require("../../domain/repositories/video.repository");
const video_output_1 = require("../dtos/video-output");
const pagination_output_1 = require("../../../shared/application/dtos/pagination-output");
var ListVideosUseCase;
(function (ListVideosUseCase) {
    class UseCase {
        constructor(videoRepository) {
            this.videoRepository = videoRepository;
        }
        async execute(input) {
            const params = new video_repository_1.VideoRepository.SearchParams(input);
            const searchResult = await this.videoRepository.search(params);
            return this.toOutput(searchResult);
        }
        toOutput(searchResult) {
            const items = searchResult.items.map(entity => {
                return video_output_1.VideoOutputMapper.toOutput(entity);
            });
            return pagination_output_1.PaginationOutputMapper.toOutput(items, searchResult);
        }
    }
    ListVideosUseCase.UseCase = UseCase;
})(ListVideosUseCase || (exports.ListVideosUseCase = ListVideosUseCase = {}));
//# sourceMappingURL=list-videos.usecase.js.map