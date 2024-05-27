import { Routes, Route } from 'react-router-dom';
import MainScreen from '../../pages/main-screen/main-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import FavotitesScreen from '../../pages/favorites-screen/favorites-screen';
import OfferScreen from '../../pages/offer-screen/offer-screen';
import ErrorScreen from '../../pages/error-screen/error-screen';
import PrivateRoute from '../private-route/private-route';
import { AppRoute } from '../constants/app-route.tsx';
import { useAppSelector } from '../../hooks/index.ts';
import LoadingScreen from '../../pages/loading-screen/loading-screen.tsx';
import browserHistory from '../../browser-history.ts';
import HistoryRouter from '../history-route/history-route.tsx';
import { fetchFavoritesAction } from '../../store/api-actions.ts';
import { store } from '../../store/index.ts';
import { useEffect } from 'react';
import { getAuthCheckedStatus, getAuthorizationStatus } from '../../store/user-process/selectors.ts';
import { getIsOfferDataLoading } from '../../store/offer-process/selectors.ts';

function App(): JSX.Element {
  const isOffersDataLoading = useAppSelector(getIsOfferDataLoading);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isAuthChecked = useAppSelector(getAuthCheckedStatus);
  useEffect(() => {
    store.dispatch(fetchFavoritesAction());
  }, [authorizationStatus]);
  if (!isAuthChecked || isOffersDataLoading) {
    return (
      <LoadingScreen />
    );
  }
  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<MainScreen />}
        />
        <Route
          path={AppRoute.Login}
          element={<LoginScreen />}
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute>
              <FavotitesScreen />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Offer}
          element={<OfferScreen />}
        />
        <Route
          path="*"
          element={<ErrorScreen />}
        />
      </Routes>
    </HistoryRouter>
  );
}

export default App;
