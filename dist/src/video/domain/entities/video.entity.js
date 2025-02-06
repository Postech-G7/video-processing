"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoEntity = void 0;
const openapi = require("@nestjs/swagger");
const entity_1 = require("../../../shared/domain/entities/entity");
const validation_error_1 = require("../../../shared/domain/errors/validation-error");
const video_validator_1 = require("../validators/video.validator");
class VideoEntity extends entity_1.Entity {
    constructor(props, id) {
        VideoEntity.validate(props);
        super(props, id);
        this.props.createdAt = props.createdAt ?? new Date();
    }
    static validate(data) {
        const validator = video_validator_1.VideoValidatorFactory.create();
        const isValid = validator.validate(data);
        if (!isValid) {
            throw new validation_error_1.EntityValidationError(validator.errors);
        }
    }
    updateStatus(value) {
        this.props.status = value;
    }
    get title() {
        return this.props.title;
    }
    get createdAt() {
        return this.props.createdAt;
    }
    get status() {
        return this.props.status;
    }
    get userEmail() {
        return this.props.userEmail;
    }
    get path() {
        return this.props.path;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.VideoEntity = VideoEntity;
//# sourceMappingURL=video.entity.js.map