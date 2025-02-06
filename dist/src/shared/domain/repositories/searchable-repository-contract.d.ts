import { Entity } from '../entities/entity';
import { RepositoryInterface } from './repositories-contracts';
export type SortDirection = 'asc' | 'desc';
export type SearchProps<Filter> = {
    page?: number;
    perPage?: number;
    sort?: string | null;
    sortDir?: SortDirection | null;
    filter?: Filter | null;
};
export type SearchResultProps<E extends Entity, Filter> = {
    items: E[];
    total: number;
    currentPage: number;
    perPage: number;
    sort: string | null;
    sortDir: string | null;
    filter: Filter | null;
};
export declare class SearchParams<Filter> {
    protected _page: number;
    protected _perPage: number;
    protected _sort: string | null;
    protected _sortDir: SortDirection | null;
    protected _filter: Filter | null;
    constructor(props?: SearchProps<Filter>);
    get page(): number;
    private set page(value);
    get perPage(): number;
    private set perPage(value);
    get sort(): string | null;
    private set sort(value);
    get sortDir(): string | null;
    private set sortDir(value);
    get filter(): Filter | null;
    private set filter(value);
}
export declare class SearchResult<E extends Entity, Filter> {
    readonly items: E[];
    readonly total: number;
    readonly currentPage: number;
    readonly perPage: number;
    readonly lastPage: number;
    readonly sort: string | null;
    readonly sortDir: string | null;
    readonly filter: Filter | null;
    constructor(params: SearchResultProps<E, Filter>);
    toJSON(forceEntity?: boolean): {
        items: any[];
        total: number;
        currentPage: number;
        perPage: number;
        lastPage: number;
        sort: string;
        sortDir: string;
        filter: Filter;
    };
}
export interface SearchableRepositoryInterface<E extends Entity, Filter, SearchInput = SearchParams<Filter>, SearchOutput = SearchResult<E, Filter>> extends RepositoryInterface<E> {
    sortableFields: string[];
    search(props: SearchInput): Promise<SearchOutput>;
}
