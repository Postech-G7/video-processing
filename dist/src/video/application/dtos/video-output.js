"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoOutputMapper = void 0;
class VideoOutputMapper {
    static toOutput(entity) {
        return {
            id: entity.id,
            title: entity.title,
            userEmail: entity.userEmail,
            status: entity.status,
            path: entity.path,
            createdAt: entity.createdAt,
        };
    }
}
exports.VideoOutputMapper = VideoOutputMapper;
//# sourceMappingURL=video-output.js.map