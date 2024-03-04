import { FC } from "react";
import { useSelector } from "react-redux";
import { AppStoreState } from "../../app/store";
import { IsLoadingState } from "../../app/slices/isLoading";
import { Backdrop, CircularProgress } from "@mui/material";

const LoaderComponent: FC = () => {
    const { isLoading } = useSelector<AppStoreState, IsLoadingState>(state => state.isLoading);
    return (
        <Backdrop sx={theme => ({ zIndex: theme.zIndex.drawer + 1, color: '#fff' })} open={isLoading}>
            <CircularProgress color="primary" />
        </Backdrop>
    )
}

export default LoaderComponent;