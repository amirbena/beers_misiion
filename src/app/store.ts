import type { Action, ThunkAction } from "@reduxjs/toolkit"
import { combineSlices, configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import isLoadingSlice from "./slices/isLoading"
import beersSlice from "./slices/beersSlice"
import paginationSlice from "./slices/paginationSlice"


const rootReducer = combineSlices(isLoadingSlice, beersSlice,paginationSlice)

export type AppStoreState = ReturnType<typeof rootReducer>

export const makeStore = (preloadedState?: Partial<AppStoreState>) => {
  const store = configureStore({
    reducer: rootReducer,
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: getDefaultMiddleware => {
      return getDefaultMiddleware().concat()
    },
    preloadedState,
  })
  setupListeners(store.dispatch)
  return store
}

export const store = makeStore()

export type AppStore = typeof store
export type AppDispatch = AppStore["dispatch"]
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  AppStoreState,
  unknown,
  Action
>
