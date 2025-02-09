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
exports.VideoCollectionPresenter = exports.VideoPresenter = void 0;
const class_transformer_1 = require("class-transformer");
const collection_presenter_1 = require("../../../shared/infraestructure/presenters/collection.presenter");
const swagger_1 = require("@nestjs/swagger");
class VideoPresenter {
    constructor(output) {
        this.id = output.id;
        this.title = output.title;
        this.status = output.status;
        this.base64 = output.base64;
        this.userId = output.userId;
        this.userEmail = output.userEmail;
        this.createdAt = output.createdAt;
    }
}
exports.VideoPresenter = VideoPresenter;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID do vídeo',
    }),
    __metadata("design:type", String)
], VideoPresenter.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Descrição do vídeo',
    }),
    __metadata("design:type", String)
], VideoPresenter.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Status do processamento do vídeo',
    }),
    __metadata("design:type", String)
], VideoPresenter.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Base64 do vídeo',
    }),
    __metadata("design:type", String)
], VideoPresenter.prototype, "base64", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID do usuário',
    }),
    __metadata("design:type", String)
], VideoPresenter.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'E-mail do usuário',
    }),
    __metadata("design:type", String)
], VideoPresenter.prototype, "userEmail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Data de criação do vídeo',
    }),
    (0, class_transformer_1.Transform)(({ value }) => value.toISOString()),
    __metadata("design:type", Date)
], VideoPresenter.prototype, "createdAt", void 0);
class VideoCollectionPresenter extends collection_presenter_1.CollectionPresenter {
    constructor(output) {
        const { items, ...paginationProps } = output;
        super(paginationProps);
        this.data = items.map(item => new VideoPresenter(item));
    }
}
exports.VideoCollectionPresenter = VideoCollectionPresenter;
//# sourceMappingURL=video.presenter.js.map