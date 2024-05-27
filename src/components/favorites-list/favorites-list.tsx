import { useAppDispatch, useAppSelector } from '../../hooks';
import { redirectToRoute } from '../../store/action';
import { getFavorites } from '../../store/favorite-process/selectors';
import { changeCity } from '../../store/offer-process/offer-process';
import { getOffers } from '../../store/offer-process/selectors';
import CityCard from '../city-card/city-card';
import { AppRoute } from '../constants/app-route';

function FavoritesList(): JSX.Element {
  const offers = useAppSelector(getOffers);
  const favorites = useAppSelector(getFavorites);
  const favoriteOffers = offers.filter((offer) => favorites.includes(offer.id));
  const favoriteOffersCitiesSet = new Set(favoriteOffers.map((of) => of.city.name));
  const favoriteOffersCities = Array.from(favoriteOffersCitiesSet);
  const dispatch = useAppDispatch();
  const handleCityClick = (city: string) => {
    dispatch(changeCity(city));
    dispatch(redirectToRoute(AppRoute.Main));
  };
  return (
    <ul className="favorites__list">
      {favoriteOffersCities.map((city) => (
        <li className="favorites__locations-items" key={city}>
          <div className="favorites__locations locations locations--current">
            <div className="locations__item">
              <a className="locations__item-link" onClick={() => handleCityClick(city)}>
                <span>{city}</span>
              </a>
            </div>
          </div>
          <div className="favorites__places">
            {favoriteOffers.filter((of) => of.city.name === city).map((offer) =>
              <CityCard key={offer.id} offer={offer} cardType='favorite' />
            )}
          </div>
        </li>
      ))}

    </ul>
  );
}

export default FavoritesList;
