"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoRepository = void 0;
const searchable_repository_contract_1 = require("../../../shared/domain/repositories/searchable-repository-contract");
var VideoRepository;
(function (VideoRepository) {
    class SearchParams extends searchable_repository_contract_1.SearchParams {
    }
    VideoRepository.SearchParams = SearchParams;
    class SearchResult extends searchable_repository_contract_1.SearchResult {
    }
    VideoRepository.SearchResult = SearchResult;
})(VideoRepository || (exports.VideoRepository = VideoRepository = {}));
//# sourceMappingURL=video.repository.js.map