"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoOutputMapper = void 0;
class VideoOutputMapper {
    static toOutput(entity) {
        return {
            id: entity.id,
            title: entity.title,
            createdAt: entity.createdAt,
            status: entity.status,
            userId: entity.userId,
            userEmail: entity.userEmail,
            base64: entity.base64,
            processedVideoUrl: entity.processedVideoUrl
        };
    }
}
exports.VideoOutputMapper = VideoOutputMapper;
//# sourceMappingURL=video-output.js.map