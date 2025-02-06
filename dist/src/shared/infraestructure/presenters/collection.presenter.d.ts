import { PaginationPresenter, PaginationPresenterProps } from './pagination.presenter';
export declare abstract class CollectionPresenter {
    protected paginationPresenter: PaginationPresenter;
    constructor(props: PaginationPresenterProps);
    get meta(): PaginationPresenter;
    abstract get data(): any;
}
