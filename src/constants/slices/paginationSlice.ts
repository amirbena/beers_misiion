export const PAGINATION_SLICE_NAME = "pagination";

export const INITIAL_PAGE = 1;
export const MAX_PAGES = 5;
export const BULK_SIZE_FETCHING = 48;

export enum PAGE_SIZES {
    FIRST = 6,
    SECOND = 12
}

export interface PaginatedBeersResult {
    pageFetching: number;
}