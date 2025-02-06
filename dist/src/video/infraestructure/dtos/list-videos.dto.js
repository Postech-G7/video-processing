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
exports.ListVideosDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class ListVideosDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { page: { required: false, type: () => Number }, perPage: { required: false, type: () => Number }, sort: { required: false, type: () => String }, sortDir: { required: false, type: () => Object }, filter: { required: false, type: () => String } };
    }
}
exports.ListVideosDto = ListVideosDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Página a ser retornada',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], ListVideosDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Quantidade de registros por página',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], ListVideosDto.prototype, "perPage", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Atributo definido para ordenar os dados',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ListVideosDto.prototype, "sort", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Direção da ordenação: crescente ou decrescente',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ListVideosDto.prototype, "sortDir", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Valor do atributo usado para filtrar os dados',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ListVideosDto.prototype, "filter", void 0);
//# sourceMappingURL=list-videos.dto.js.map