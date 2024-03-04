import React, { FC, useMemo, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar'; // 
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Drawer, IconButton, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { ALL_BEERS_ROUTE, ALL_BEERS_TITLE, FAVORITE_BEERS_ROUTE, FAVORITE_BEERS_TITLE } from '../../constants/router/routerConstants';


const RightSideMenu: FC = () => {
    const [open, setOpen] = useState<boolean>(false);

    const location = useLocation();
    const navigate = useNavigate();

    const titles: Record<string, string> = {
        [ALL_BEERS_ROUTE]: ALL_BEERS_TITLE,
        [FAVORITE_BEERS_ROUTE]: FAVORITE_BEERS_TITLE
    };

    const pageTitle = useMemo(() => {
        return titles[location.pathname]
    }, [location])


    const handleDrawerOpen = () => setOpen(true);
    const handleDrawerClose = () => setOpen(false);

    const navigateByClick = (route: string) => {
        navigate(route, { replace: true });
        handleDrawerClose();
    };

    const renderOptions = () => (
        <>
            {Object.entries(titles).map(([route, title]) => (
                <ListItemButton key={title} onClick={() => navigateByClick(route)}>
                    <ListItemText primary={title} />
                </ListItemButton>
            ))}
        </>
    )

    return (
        <>
            <AppBar position="static" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Toolbar>
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
                        {pageTitle}
                    </Typography>
                    <IconButton onClick={handleDrawerOpen} size="large" edge="end" color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer
                anchor="right"
                open={open}
                onClose={handleDrawerClose}
                sx={{ width: 250, '& .MuiDrawer-paper': { width: 250 } }} // Adjust width as needed
            >
                <IconButton onClick={handleDrawerClose} sx={{ display: 'absolute', right: 8, top: 8 }}>
                    <CloseIcon />
                </IconButton>
                <List>
                    {renderOptions()}
                </List>
            </Drawer>
        </>
    );
};

export default RightSideMenu;