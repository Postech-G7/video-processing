import { Entity } from '../../../shared/domain/entities/entity';
import { SearchResult } from '../../../shared/domain/repositories/searchable-repository-contract';
export type PaginationOutput<Item> = {
    items: Item[];
    total: number;
    currentPage: number;
    perPage: number;
    lastPage: number;
};
type Filter = string | null;
export declare class PaginationOutputMapper {
    static toOutput<Item>(items: Item[], result: SearchResult<Entity, Filter>): PaginationOutput<Item>;
}
export {};
