"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchResult = exports.SearchParams = void 0;
class SearchParams {
    constructor(props) {
        this._perPage = 15;
        this.page = props?.page;
        this.perPage = props?.perPage;
        this.sort = props?.sort;
        this.sortDir = props?.sortDir;
        this.filter = props?.filter;
    }
    get page() {
        return this._page;
    }
    set page(value) {
        let _page = +value;
        if (typeof _page !== 'number' ||
            _page <= 0 ||
            parseInt(_page) !== _page) {
            _page = 1;
        }
        this._page = _page;
    }
    get perPage() {
        return this._perPage;
    }
    set perPage(value) {
        let _perPage = value === true ? this._perPage : +value;
        if (Number.isNaN(_perPage) ||
            _perPage <= 0 ||
            parseInt(_perPage) !== _perPage) {
            _perPage = this._perPage;
        }
        this._perPage = _perPage;
    }
    get sort() {
        return this._sort;
    }
    set sort(value) {
        const sortValue = value ? value.toString() : null;
        this._sort = sortValue;
    }
    get sortDir() {
        return this._sortDir;
    }
    set sortDir(value) {
        if (!this.sort) {
            this._sortDir = null;
            return;
        }
        if (!value) {
            this._sortDir = 'desc';
            return;
        }
        const dir = value.toString().toLowerCase();
        this._sortDir = dir !== 'asc' && dir !== 'desc' ? 'desc' : dir;
    }
    get filter() {
        return this._filter;
    }
    set filter(value) {
        const filterValue = value ?? null;
        this._filter = filterValue;
    }
}
exports.SearchParams = SearchParams;
class SearchResult {
    constructor(params) {
        this.items = params.items;
        this.total = params.total;
        this.currentPage = params.currentPage;
        this.perPage = params.perPage;
        this.lastPage = Math.ceil(this.total / this.perPage);
        this.sort = params.sort ?? null;
        this.sortDir = params.sortDir ?? null;
        this.filter = params.filter ?? null;
    }
    toJSON(forceEntity = false) {
        return {
            items: forceEntity ? this.items.map(item => item.toJson()) : this.items,
            total: this.total,
            currentPage: this.currentPage,
            perPage: this.perPage,
            lastPage: this.lastPage,
            sort: this.sort,
            sortDir: this.sortDir,
            filter: this.filter,
        };
    }
}
exports.SearchResult = SearchResult;
//# sourceMappingURL=searchable-repository-contract.js.map