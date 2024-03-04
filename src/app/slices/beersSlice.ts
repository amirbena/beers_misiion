import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { BEER_SLICE_NAME, ChangeBeerFavoriteRank, ChangeBeerFavority, ChangeBeerRank, FoodPairingFilter } from "../../constants/slices/beerSlice";
import { BeersList, FavoriteBeersList } from "../../types/beer/Beer";
import { fetchPaginatedBeers } from "../thunks/beersThunk";


export interface BeersState {
    allBeers: BeersList;
    filteredBeers: BeersList;
    foodPairingSearch: string;
    favoriteBeers: FavoriteBeersList;
    errorMessage: string;
    maxPages: number;
}

export const initialState: BeersState = {
    allBeers: [],
    filteredBeers: [],
    favoriteBeers: [],
    foodPairingSearch: '',
    errorMessage: '',
    maxPages: 5
}

const beersSlice = createSlice({
    name: BEER_SLICE_NAME,
    initialState,
    reducers: {
        changeBeerFavority: (state, action: PayloadAction<ChangeBeerFavority>) => {
            const { payload: { beer: beerToCheck } } = action;
            const index = state.allBeers.findIndex(beer => beerToCheck.id === beer.id);
            if (index !== -1) {
                const isFavoriteBeer = !!!state.allBeers[index].is_favorite;
                state.allBeers[index].is_favorite = isFavoriteBeer;

                if (isFavoriteBeer) {
                    state.favoriteBeers = [...state.favoriteBeers, { ...state.allBeers[index] }];
                }
                else {
                    state.favoriteBeers = state.favoriteBeers.filter(beer => beer.id !== beerToCheck.id);
                }

            }
        },
        setMaxPages: (state, action: PayloadAction<number>) => {
            state.maxPages = action.payload;
        },
        changeBeersFilter: (state, action: PayloadAction<FoodPairingFilter>) => {
            const { payload: { food_pairing: foodPairingSearch } } = action;
            state.foodPairingSearch = foodPairingSearch;

        },
        changeBeerRank: (state, action: PayloadAction<ChangeBeerRank>) => {
            const { payload: { beer: beerToCheck, rank } } = action;
            const index = state.favoriteBeers.findIndex(beer => beerToCheck.id === beer.id);
            if (index !== -1) {
                state.favoriteBeers[index].rank = rank;
            }
        },
        changeBeerFavorityRank: (state, action: PayloadAction<ChangeBeerFavoriteRank>) => {
            const { payload: { beer: beerToCheck, rank, isFavorite } } = action;
            const index = state.allBeers.findIndex(beer => beerToCheck.id === beer.id);
            if (index !== -1) {
                state.allBeers[index].is_favorite = isFavorite;
                const foundIndexFavoriteBeers = state.favoriteBeers.findIndex(beer => beerToCheck.id === beer.id);
                if (isFavorite) {
                    if (foundIndexFavoriteBeers === -1) {
                        state.favoriteBeers = [...state.favoriteBeers, { ...state.allBeers[index], rank: rank }];
                    }
                    else if (rank !== undefined) {
                        state.favoriteBeers[index].rank = rank;
                    }
                }
                else {
                    state.favoriteBeers = state.favoriteBeers.filter(beer => beer.id !== beerToCheck.id);
                }

            }

            const filteredBeersIndex = state.filteredBeers.findIndex(beer => beerToCheck.id === beer.id);
            if (filteredBeersIndex !== -1) {
                state.filteredBeers[filteredBeersIndex].is_favorite = isFavorite;
            }
        },
        filterBeers: (state) => {
            state.filteredBeers = state.allBeers;
            if (!!state.foodPairingSearch) {
                state.filteredBeers = state.allBeers.filter(beer => {
                    const { food_pairing } = beer;
                    return !!food_pairing.find(food_pairing_item => food_pairing_item.includes(state.foodPairingSearch));
                })
            }
        },
        concatAllBeers: (state, action: PayloadAction<BeersList>) => {
            const beersToConcat = state.allBeers.concat(action.payload);
            state.allBeers = beersToConcat;
        },

        removeAllFavoriteBeers: (state) => {
            state.allBeers.forEach(beer => {
                if (!!beer.is_favorite) {
                    beer.is_favorite = !beer.is_favorite;
                }
            })
            state.filteredBeers = [];
        },

    },
    extraReducers: builder => {
        builder.addCase(fetchPaginatedBeers.fulfilled, (state, action) => {
            const beersToConcat = state.allBeers.concat(action.payload);
            state.allBeers = beersToConcat;
            state.filteredBeers = beersToConcat;
            if (!!state.foodPairingSearch) {
                state.filteredBeers = beersToConcat.filter(beer => {
                    const { food_pairing } = beer;
                    return !!food_pairing.find(food_pairing_item => food_pairing_item.includes(state.foodPairingSearch));
                })
            }
        });

        builder.addCase(fetchPaginatedBeers.rejected, (state, action) => {
            state.errorMessage = action.error.message || "";
        });
    }
});

export default beersSlice;
export const beersReducer = beersSlice.reducer;
export const { changeBeerFavority, concatAllBeers, filterBeers, changeBeersFilter, changeBeerRank, changeBeerFavorityRank, setMaxPages, removeAllFavoriteBeers } = beersSlice.actions;