"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchableInMemoryRepository = void 0;
const in_memory_repository_1 = require("./in-memory-repository");
const searchable_repository_contract_1 = require("./searchable-repository-contract");
class SearchableInMemoryRepository extends in_memory_repository_1.InMemoryRepository {
    async search(params) {
        const itemsFiltered = await this.applyFilter(this.items, params.filter);
        const itemsSorted = await this.applySort(itemsFiltered, params.sort, params.sortDir);
        const itemsPaginated = await this.applyPagination(itemsSorted, params.page, params.perPage);
        return new searchable_repository_contract_1.SearchResult({
            items: itemsPaginated,
            total: itemsFiltered.length,
            currentPage: params.page,
            perPage: params.perPage,
            sort: params.sort,
            sortDir: params.sortDir,
            filter: params.filter,
        });
    }
    async applySort(items, sort, sortDir) {
        if (!sort || !this.sortableFields.includes(sort)) {
            return items;
        }
        return [...items].sort((entityA, entityB) => {
            if (entityA.props[sort] < entityB.props[sort]) {
                return sortDir === 'asc' ? -1 : 1;
            }
            if (entityA.props[sort] > entityB.props[sort]) {
                return sortDir === 'asc' ? 1 : -1;
            }
            return 0;
        });
    }
    async applyPagination(items, page, perPage) {
        const start = (page - 1) * perPage;
        const limit = start + perPage;
        return items.slice(start, limit);
    }
}
exports.SearchableInMemoryRepository = SearchableInMemoryRepository;
//# sourceMappingURL=in-memory-searchable-repository.js.map