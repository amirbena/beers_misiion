import { createAsyncThunk } from '@reduxjs/toolkit';
import { FETCH_PAGINATED_BEERS } from '../../constants/thunks/beersThunkConstants';
import { BeersList } from '../../types/beer/Beer';
import { getPaginatedBeers } from '../../network';
import { PaginatedBeers } from '../../constants/network/networkConstants';
import { setIsLoading } from '../slices/isLoading';
import { changePaginatedBeers } from '../slices/paginationSlice';



export const fetchPaginatedBeers = createAsyncThunk<BeersList, PaginatedBeers>(FETCH_PAGINATED_BEERS, async (paginatedBeers: PaginatedBeers, { dispatch }) => {
    try {
        const { pageNumber } = paginatedBeers;
        dispatch(setIsLoading(true));
        const beers = await getPaginatedBeers(paginatedBeers);
        dispatch(changePaginatedBeers({ pageFetching: pageNumber + 1 }))
        dispatch(setIsLoading(false));
        return beers;
    }
    catch (error) {
        dispatch(setIsLoading(false));
        throw error;
    }
});

