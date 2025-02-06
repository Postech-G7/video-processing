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
const swagger_1 = require("@nestjs/swagger");
class VideoPresenter {
    constructor(output) {
        this.id = output.id;
        this.title = output.title;
        this.userEmail = output.userEmail;
        this.status = output.status;
        this.path = output.path;
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
        description: 'E-mail do usuário',
    }),
    __metadata("design:type", String)
], VideoPresenter.prototype, "userEmail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Status do processamento do vídeo',
    }),
    __metadata("design:type", String)
], VideoPresenter.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Caminho do vídeo',
    }),
    __metadata("design:type", String)
], VideoPresenter.prototype, "path", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Data de criação do vídeo',
    }),
    (0, class_transformer_1.Transform)(({ value }) => value.toISOString()),
    __metadata("design:type", Date)
], VideoPresenter.prototype, "createdAt", void 0);
class VideoCollectionPresenter {
    constructor(output) {
        this.data = output.items.map(item => new VideoPresenter(item));
        this.meta = {
            total: output.total,
            currentPage: output.currentPage,
            perPage: output.perPage,
            lastPage: Math.ceil(output.total / output.perPage),
        };
    }
}
exports.VideoCollectionPresenter = VideoCollectionPresenter;
//# sourceMappingURL=video.presenter.js.map