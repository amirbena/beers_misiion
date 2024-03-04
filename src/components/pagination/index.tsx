import { FC, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppStoreState } from "../../app/store";
import { BeersState } from "../../app/slices/beersSlice";
import { PaginationState, changePage } from "../../app/slices/paginationSlice";
import { Pagination } from "@mui/material";

const BeersPagination: FC = () => {
    const { maxPages } = useSelector<AppStoreState, BeersState>((state) => state.beers);

    const dispatch: AppDispatch = useDispatch()

    const handleChangePage = (event: React.ChangeEvent<unknown>, page: number) => {
        dispatch(changePage(page));

    }

    return (
        <Pagination count={maxPages} color="primary" onChange={handleChangePage} />
    );
}

export default BeersPagination;