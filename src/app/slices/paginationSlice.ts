import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { BULK_SIZE_FETCHING, INITIAL_PAGE, MAX_PAGES, PAGE_SIZES, PAGINATION_SLICE_NAME, PaginatedBeersResult } from "../../constants/slices/paginationSlice";


export interface PaginationState {
    page: number;
    pageSize: PAGE_SIZES;
    bulkSizeFetching: number;
    pageFetching: number;
}

export const initialPaginationState: PaginationState = {
    page: INITIAL_PAGE,
    pageSize: PAGE_SIZES.FIRST,
    bulkSizeFetching: BULK_SIZE_FETCHING,
    pageFetching: INITIAL_PAGE
}

const paginationSlice = createSlice({
    name: PAGINATION_SLICE_NAME,
    initialState: initialPaginationState,
    reducers: {
        changePage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        changePageSize: (state, action: PayloadAction<PAGE_SIZES>) => {
            state.pageSize = action.payload;
        },
        changePageFetching: (state, action: PayloadAction<number>) => {
            state.pageFetching = action.payload;
        },
        changePaginatedBeers: (state, action: PayloadAction<PaginatedBeersResult>) => {
            const { pageFetching } = action.payload;
            state.pageFetching = pageFetching;
        }


    },

});

export default paginationSlice;
export const paginationReducer = paginationSlice.reducer;
export const { changePage, changePageSize, changePageFetching, changePaginatedBeers } = paginationSlice.actions;