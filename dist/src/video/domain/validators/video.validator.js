"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoValidatorFactory = exports.VideoValidator = exports.VideoRules = void 0;
const class_validator_fields_1 = require("../../../shared/domain/validators/class-validator-fields");
const class_validator_1 = require("class-validator");
class VideoRules {
    constructor(data) {
        Object.assign(this, data);
    }
}
exports.VideoRules = VideoRules;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], VideoRules.prototype, "base64", void 0);
__decorate([
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.MaxLength)(255),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], VideoRules.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsIn)(['processing', 'completed', 'failed', 'retrieved']),
    __metadata("design:type", String)
], VideoRules.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], VideoRules.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], VideoRules.prototype, "userEmail", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], VideoRules.prototype, "createdAt", void 0);
class VideoValidator extends class_validator_fields_1.ClassValidatorFields {
    validate(data) {
        return data && super.validate(new VideoRules(data));
    }
}
exports.VideoValidator = VideoValidator;
class VideoValidatorFactory {
    static create() {
        return new VideoValidator();
    }
}
exports.VideoValidatorFactory = VideoValidatorFactory;
//# sourceMappingURL=video.validator.js.map