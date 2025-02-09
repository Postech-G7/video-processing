"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoModelMapper = void 0;
const validation_error_1 = require("../../../../../shared/domain/errors/validation-error");
const video_entity_1 = require("../../../../domain/entities/video.entity");
class VideoModelMapper {
    static toEntity(model) {
        const { title, base64, userId, userEmail, status, createdAt, processedVideoUrl } = model;
        const entity = {
            title,
            base64,
            userId,
            userEmail,
            status,
            createdAt,
            processedVideoUrl,
        };
        try {
            return new video_entity_1.VideoEntity(entity, model.id);
        }
        catch (error) {
            throw new validation_error_1.ValidationError('Entity not loaded');
        }
    }
}
exports.VideoModelMapper = VideoModelMapper;
//# sourceMappingURL=video-model.mapper.js.map