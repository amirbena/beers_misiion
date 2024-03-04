export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://api.punkapi.com/v2";

export const BEERS_PREFIX = `${BACKEND_URL}/beers`;

export interface PaginatedBeers {
    pageNumber: number;
    pageSize: number;
}
