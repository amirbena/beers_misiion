import React, { FC } from 'react';
import "./App.css"
import RightSideMenu from "./components/rightsideMenu"
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Backdrop, CircularProgress, } from '@mui/material';
import LoaderComponent from './components/loaderComponent';
import { ALL_BEERS_ROUTE, FAVORITE_BEERS_ROUTE } from './constants/router/routerConstants';
import BeersPage from './pages/beers';
import FavoriteBeersPage from './pages/favoriteBeers';


const App: FC = () => {

  return (
    <div className="App">
      <BrowserRouter>
        <RightSideMenu />
        <Routes>
          <Route path={ALL_BEERS_ROUTE} element={<BeersPage />} />
          <Route path={FAVORITE_BEERS_ROUTE} element={<FavoriteBeersPage />} />
          <Route path="/" element={<Navigate replace to={ALL_BEERS_ROUTE} />} />
        </Routes>
        <LoaderComponent />
      </BrowserRouter>
    </div>
  )
}

export default App
