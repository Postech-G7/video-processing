"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryRepository = void 0;
const not_found_error_1 = require("../errors/not-found-error");
class InMemoryRepository {
    constructor() {
        this.items = [];
    }
    async insert(entity) {
        this.items.push(entity);
    }
    async findById(id) {
        return this._get(id);
    }
    async findAll() {
        return this.items;
    }
    async update(newEntity) {
        const entityToUpdate = await this._get(newEntity._id);
        const index = this._getIndex(entityToUpdate._id);
        this.items[index] = newEntity;
    }
    async delete(id) {
        const entityToDelete = await this._get(id);
        const index = this._getIndex(entityToDelete._id);
        this.items.splice(index, 1);
    }
    async _get(id) {
        const _id = `${id}`;
        const entity = this.items.find(item => item._id === _id);
        if (!entity) {
            throw new not_found_error_1.NotFoundError('Entity not found');
        }
        return entity;
    }
    _getIndex(id) {
        const _id = `${id}`;
        const index = this.items.findIndex(item => item._id === _id);
        if (index === -1) {
            throw new not_found_error_1.NotFoundError('Entity not found');
        }
        return index;
    }
}
exports.InMemoryRepository = InMemoryRepository;
//# sourceMappingURL=in-memory-repository.js.map