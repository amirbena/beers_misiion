import { FC, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppStoreState } from '../../app/store';
import { BeersState, changeBeersFilter, filterBeers, setMaxPages } from '../../app/slices/beersSlice';
import { BeersList } from '../../types/beer/Beer';
import { PaginationState, changePageSize } from '../../app/slices/paginationSlice';
import { fetchPaginatedBeers } from '../../app/thunks/beersThunk';
import { Alert, Box, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
import { PAGE_SIZES } from '../../constants/slices/paginationSlice';
import { ENTER_KEY } from '../../constants';
import BeersPagination from '../../components/pagination';
import Beer from '../../components/beer';


const BeersPage: FC = () => {
    const { filteredBeers, foodPairingSearch, allBeers, errorMessage } = useSelector<AppStoreState, BeersState>((state) => state.beers);
    const { pageSize, page, bulkSizeFetching, pageFetching } = useSelector<AppStoreState, PaginationState>(state => state.pagination);
    const dispatch = useDispatch<AppDispatch>();


    useEffect(() => {
        const startIndex = (page - 1) * pageSize;
        const indexToCheck = startIndex + pageSize;
        if (indexToCheck >= allBeers.length) {
            dispatch(fetchPaginatedBeers({ pageNumber: pageFetching, pageSize: bulkSizeFetching }));
        }
    }, [page, pageSize])

    const beersToShow: BeersList = useMemo<BeersList>((() => {
        const startIndex = (page - 1) * pageSize;
        const endIndex = page * pageSize;
        const beers = filteredBeers.slice(startIndex, endIndex);
        const maxPages = Math.floor(filteredBeers.length / pageSize) + 1;
        dispatch(setMaxPages(maxPages));
        return beers;
    }), [filteredBeers, page, pageSize]);


    const handleChangeSelect = (e: SelectChangeEvent<PAGE_SIZES>) => {
        dispatch(changePageSize(e.target.value as PAGE_SIZES));
    }

    const handleChangeBeerFilter = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        dispatch(changeBeersFilter({ food_pairing: e.target.value }));
    }

    const handleFilterBeers = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === ENTER_KEY) {
            dispatch(filterBeers());
        }
    }

    const renderBeers = () => (
        <>
            <Grid container spacing={2} sx={{ marginTop: 10 }}>
                {beersToShow.map(beer => (
                    <Grid item xs={4}>
                        <Beer beer={beer} />
                    </Grid>
                ))}

            </Grid>
            <div style={{ marginTop: '100px' }}>
                <BeersPagination />
            </div>

        </>
    )

    return (
        <Box sx={{ minHeight: '100vh', marginTop: '10px' }}>
            <Typography variant='h2' color={'brown'}>All Beers</Typography>
            <Box sx={{ marginTop: 2 }}> {/* Added Box for styling */}
                <FormControl sx={{ marginRight: 50 }}>
                    <InputLabel id="filter-label">Page Size</InputLabel>
                    <Select
                        labelId="filter-label"
                        id="filter-select"
                        value={pageSize}
                        onChange={handleChangeSelect}
                        label="Page Size"
                        sx={{ width: '80px' }}
                    >
                        <MenuItem value={PAGE_SIZES.FIRST}>{PAGE_SIZES.FIRST}</MenuItem>
                        <MenuItem value={PAGE_SIZES.SECOND}>{PAGE_SIZES.SECOND}</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    label="Search Food Pairing"
                    variant="outlined"
                    value={foodPairingSearch}
                    onChange={handleChangeBeerFilter}
                    onKeyDown={handleFilterBeers}
                />
            </Box>
            {
                beersToShow.length ?
                    renderBeers()
                    :
                    <Typography variant='body1' color={"red"}>
                        Nothing to Show
                    </Typography>
            }

            {errorMessage &&
                <Alert severity="error">{errorMessage}</Alert>
            }
        </Box>

    );
}

export default BeersPage;