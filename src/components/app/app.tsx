import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainScreen from '../../pages/main-screen/main-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import FavotitesScreen from '../../pages/favorites-screen/favorites-screen';
import OfferScreen from '../../pages/offer-screen/offer-screen';
import ErrorScreen from '../../pages/error-screen/error-screen';
import PrivateRoute from '../private-route/private-route';
import { AuthorizationStatus } from '../constants/status.tsx';
import { AppRoute } from '../constants/app-route.tsx';
import { Offer } from '../../types/offer';
import { Review } from '../../types/review.ts';

type AppComponentProps = {
  placesCount: number;
  offers: Offer[];
  reviews: Review[];
}

function App({ placesCount, offers, reviews }: AppComponentProps): JSX.Element {
  const favourites = offers.filter((o) => o.isFavorite);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<MainScreen placesCount={placesCount} offers={offers}/>}
        />
        <Route
          path={AppRoute.Login}
          element={<LoginScreen/>}
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute
              authorizationStatus={AuthorizationStatus.Auth}
            >
              <FavotitesScreen offers={favourites}/>
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Offer}
          element={<OfferScreen reviews={reviews}/>}
        />
        <Route
          path="*"
          element={<ErrorScreen/>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
