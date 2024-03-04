import { FavoriteBeer } from "../../types/beer/Beer";

export interface BeerProps {
    beer: FavoriteBeer
    isBeerRank?: boolean;
}

export const imageInPopup = "IMAGE";
export const taglineInPopup = "TAGLINE";
export const favoriteFoodsInPopup = "FAVORITE FOODS";
export const isFavoriteInPopup = "IS FAVORITE";

export const CloseButton = "Close";
export const SaveButton = "Save";

export const RANK_OPTIONS = [1, 2, 3, 4, 5];