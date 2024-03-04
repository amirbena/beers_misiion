import { FavoriteBeer } from "../../types/beer/Beer";

export const BEER_SLICE_NAME = "beers";

export interface FoodPairingFilter {
    food_pairing: string;
}

export interface ChangeBeerFavority {
    beer: FavoriteBeer;
}

export type ChangeBeerRank = ChangeBeerFavority & {
    rank: number;
}

export interface ChangeBeerFavoriteRank {
    beer: FavoriteBeer;
    rank?: number;
    isFavorite?: boolean;
}