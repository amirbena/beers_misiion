
import { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppStoreState } from '../../app/store';
import { BeersState, removeAllFavoriteBeers } from '../../app/slices/beersSlice';
import { Box, Button, Grid, Modal, Typography } from '@mui/material';
import Beer from '../../components/beer';
import { styles } from './style';

const FavoriteBeersPage: FC = () => {
    const { favoriteBeers } = useSelector<AppStoreState, BeersState>((state) => state.beers);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const dispatch = useDispatch<AppDispatch>();



    const onOpenModal = () => setOpenModal(true);
    const onCloseModal = () => setOpenModal(false);
    const handleDeleteAll = () => {
        dispatch(removeAllFavoriteBeers());
        setOpenModal(false);
    }


    const renderFavoriteBeers = () => (
        <>
            <Button color='error' onClick={onOpenModal}>
                Remove All
            </Button>
            <Modal sx={styles.modalStyle} open={openModal} onClose={onCloseModal}>
                <div style={{ padding: 20 }}>
                    <Typography variant="h5" component="h2">
                        Are you sure to remove?
                    </Typography>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 15 }}>
                        <Button variant="outlined" color="error" onClick={handleDeleteAll}>
                            Delete
                        </Button>
                        <Button variant="contained" onClick={onCloseModal} style={{ marginLeft: 10 }}>
                            Close
                        </Button>
                    </div>
                </div>
            </Modal>
            <Grid container spacing={2} sx={{ marginTop: 10 }}>
                {favoriteBeers.map(beer => (
                    <Grid item xs={4}>
                        <Beer beer={beer} isBeerRank />
                    </Grid>
                ))}

            </Grid>

        </>
    )


    return (
        <Box sx={{ minHeight: '100vh', marginTop: '10px' }}>
            <Typography variant='h2' color={'brown'}>Favorite Beers</Typography>
            {
                favoriteBeers.length ?
                    renderFavoriteBeers()
                    :
                    <Typography variant='body1' sx={{ marginTop: 10 }} color={"red"}>
                        Nothing to Show
                    </Typography>
            }
        </Box>
    );
}

export default FavoriteBeersPage;