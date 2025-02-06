import { Entity } from '../entities/entity';
import { InMemoryRepository } from './in-memory-repository';
import { SearchableRepositoryInterface, SearchParams, SearchResult } from './searchable-repository-contract';
export declare abstract class SearchableInMemoryRepository<E extends Entity, Filter> extends InMemoryRepository<E> implements SearchableRepositoryInterface<E, Filter, SearchParams<Filter>, SearchResult<E, Filter>> {
    abstract sortableFields: string[];
    search(params: SearchParams<Filter>): Promise<SearchResult<E, Filter>>;
    protected abstract applyFilter(items: E[], filter: Filter | null): Promise<E[]>;
    protected applySort(items: E[], sort: SearchParams<Filter>['sort'] | null, sortDir: SearchParams<Filter>['sortDir']): Promise<E[]>;
    protected applyPagination(items: E[], page: SearchParams<string>['page'], perPage: SearchParams<string>['perPage']): Promise<E[]>;
}
