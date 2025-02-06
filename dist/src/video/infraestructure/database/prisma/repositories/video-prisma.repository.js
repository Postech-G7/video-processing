"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoPrismaRepository = void 0;
const not_found_error_1 = require("../../../../../shared/domain/errors/not-found-error");
const video_repository_1 = require("../../../../domain/repositories/video.repository");
const video_model_mapper_1 = require("../models/video-model.mapper");
class VideoPrismaRepository {
    constructor(prismaService) {
        this.prismaService = prismaService;
        this.sortableFields = ['userEmail', 'createdAt'];
    }
    async search(props) {
        const sortable = this.sortableFields?.includes(props.sort);
        const orderByField = sortable ? props.sort : 'createdAt';
        const orderByDir = sortable ? props.sortDir : 'desc';
        const filter = props.filter || null;
        const count = await this.prismaService.video.count({
            ...(props.filter && {
                where: {
                    userEmail: {
                        equals: filter,
                    },
                },
            }),
        });
        const models = await this.prismaService.video.findMany({
            ...(props.filter && {
                where: {
                    userEmail: {
                        equals: filter,
                    },
                },
            }),
            orderBy: {
                [orderByField]: orderByDir,
            },
            skip: props.page && props.page > 0 ? (props.page - 1) * props.perPage : 1,
            take: props.perPage,
        });
        return new video_repository_1.VideoRepository.SearchResult({
            items: models.map(model => video_model_mapper_1.VideoModelMapper.toEntity(model)),
            total: count,
            currentPage: props.page,
            perPage: props.perPage,
            sort: props.sort,
            sortDir: props.sortDir,
            filter: props.filter,
        });
    }
    async insert(entity) {
        await this.prismaService.video.create({
            data: entity.toJson(),
        });
    }
    async update(entity) {
        await this._get(entity._id);
        await this.prismaService.video.update({
            data: entity.toJson(),
            where: {
                id: entity._id,
            },
        });
    }
    async findById(id) {
        return await this._get(id);
    }
    async findAll() {
        const models = await this.prismaService.video.findMany();
        return models.map(model => video_model_mapper_1.VideoModelMapper.toEntity(model));
    }
    async delete(id) {
        await this._get(id);
        await this.prismaService.video.delete({
            where: { id },
        });
    }
    async _get(id) {
        try {
            const video = await this.prismaService.video.findUnique({
                where: {
                    id,
                },
            });
            return video_model_mapper_1.VideoModelMapper.toEntity(video);
        }
        catch (error) {
            throw new not_found_error_1.NotFoundError(`Video not found using ID ${id}`);
        }
    }
}
exports.VideoPrismaRepository = VideoPrismaRepository;
//# sourceMappingURL=video-prisma.repository.js.map