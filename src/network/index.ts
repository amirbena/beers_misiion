import axios from 'axios';
import { BEERS_PREFIX, PaginatedBeers } from '../constants/network/networkConstants';
import { BeersList } from '../types/beer/Beer';

export const getAllBeers = async (): Promise<BeersList> => {
    const beersResult = await axios.get(BEERS_PREFIX);
    return beersResult.data;
}

export const getSpecificBeers = async (beerId: number): Promise<BeersList> => {
    const beersResult = await axios.get(`${BEERS_PREFIX}/${beerId}`);
    const listBeer = beersResult.data;
    return listBeer;
}


export const getRandomBeers = async () => {
    const beersResult = await axios.get(`${BEERS_PREFIX}/random`);
    const listBeer = beersResult.data;
    return listBeer;
}

export const getPaginatedBeers = async (paginatedBeers: PaginatedBeers): Promise<BeersList> => {
    const { pageNumber, pageSize } = paginatedBeers;
    const beersResult = await axios.get(`${BEERS_PREFIX}?page=${pageNumber}&per_page=${pageSize}`);
    const listBeer = beersResult.data;
    return listBeer;
}