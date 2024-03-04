import { FC, useState } from "react";
import { BeerProps, CloseButton, RANK_OPTIONS, SaveButton, favoriteFoodsInPopup, imageInPopup, isFavoriteInPopup, taglineInPopup } from "../../constants/components/beer";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { Card, CardContent, CardHeader, Typography, Modal, Button, Grid, SelectChangeEvent, Select, MenuItem, Box, Switch } from "@mui/material";
import { styles } from "./style";
import { changeBeerFavorityRank } from "../../app/slices/beersSlice";

const Beer: FC<BeerProps> = ({ beer, isBeerRank }) => {

    const [open, setOpen] = useState<boolean>(false);
    const [isFavorite, setIsFavorite] = useState<boolean>(beer.is_favorite || false);
    const [rank, setRank] = useState<number>(beer.rank || 0);


    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const dispatch: AppDispatch = useDispatch();

    const handleChangeSelect = (e: SelectChangeEvent<number>) => {
        setRank(Number(e.target.value));
    }

    const renderMenuItems = () => {
        return RANK_OPTIONS.map(item => (
            <MenuItem value={item}>{item}</MenuItem>
        ))
    }

    const changeFavorite = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsFavorite(e.target.checked);
    }

    const handleSave = () => {
        dispatch(changeBeerFavorityRank({ beer, isFavorite, rank }));
        setOpen(false);
    }

    return (
        <>
            <Card variant="outlined" onClick={handleOpen}>
                <CardHeader sx={styles.cardHeader} title={beer.name}>
                </CardHeader>
                <CardContent>
                    <Typography sx={styles.paperFontSize} color="text.secondary" gutterBottom>
                        {beer.description}
                    </Typography>
                    {isBeerRank &&
                        <Typography sx={styles.paperFontSize} color="text.secondary" gutterBottom>
                            Beer rank: {beer.rank}
                        </Typography>
                    }

                </CardContent>
            </Card>

            <Modal open={open} onClose={handleClose}>
                <Box sx={styles.paperStyle}>
                    <Typography variant="h2" sx={{ marginBottom: '15px' }}>
                        {beer.name}
                    </Typography>
                    <Grid container sx={{ marginTop: '10px' }}>

                        <Grid item xs={6}><Typography variant="body1" color={"blue"}>{imageInPopup}</Typography></Grid>
                        <Grid item xs={6}><img src={beer.image_url} height={"100px"} /></Grid>

                        <Grid item xs={6}><Typography variant="body1" color={"blue"}>{taglineInPopup}</Typography></Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1" sx={{ marginBottom: '15px' }}>
                                {beer.tagline}
                            </Typography>
                        </Grid>

                        <Grid item xs={6}><Typography variant="body1" color={"blue"}>{favoriteFoodsInPopup}</Typography></Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1" sx={{ marginBottom: '15px' }}>
                                {beer.food_pairing.join(",")}
                            </Typography>
                        </Grid>

                        <Grid item xs={6}><Typography variant="body1" color={"blue"}>{isFavoriteInPopup}</Typography></Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1" sx={{ marginBottom: '15px' }}>
                                <Switch checked={isFavorite} onChange={changeFavorite} color="primary" />
                            </Typography>
                        </Grid>



                        {
                            isBeerRank &&
                            <>
                                <Grid item xs={6}><Typography variant="body1" color={"blue"}>BEER RANK</Typography></Grid>
                                <Grid item xs={6}>
                                    <Select
                                        value={rank}
                                        onChange={handleChangeSelect}
                                    >
                                        {renderMenuItems()}

                                    </Select>
                                </Grid>
                            </>

                        }
                    </Grid>
                    <Grid container>
                        <Grid item xs={6}>
                            <Button variant="contained" color="error" onClick={handleClose}>
                                {CloseButton}
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button variant="contained" color="primary" onClick={handleSave}>
                                {SaveButton}
                            </Button>
                        </Grid>
                    </Grid>

                </Box>
            </Modal>
        </>
    );
}

export default Beer;