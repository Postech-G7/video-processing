export type PaginationPresenterProps = {
    currentPage: number;
    perPage: number;
    lastPage: number;
    total: number;
};
export declare class PaginationPresenter {
    currentPage: number;
    perPage: number;
    lastPage: number;
    total: number;
    constructor(props: PaginationPresenterProps);
}
