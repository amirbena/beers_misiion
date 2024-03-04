import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IS_LOADING_SLICE } from "../../constants/slices/isLoadingSlice";

export interface IsLoadingState {
    isLoading: boolean;
}

export const initialLoadingState: IsLoadingState = {
    isLoading: false
}

const isLoadingSlice = createSlice({
    initialState: initialLoadingState,
    name: IS_LOADING_SLICE,
    reducers: {
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        }
    }
})

export default isLoadingSlice;
export const isLoadingReducer = isLoadingSlice.reducer;
export const { setIsLoading } = isLoadingSlice.actions;