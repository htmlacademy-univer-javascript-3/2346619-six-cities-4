import CommentForm from '../../components/comment-form/comment-form';
import ReviewsList from '../../components/review-list/review-list';
import Map from '../../components/map/map';
import CityCardList from '../../components/offer-list/offer-list';
import { useAppSelector } from '../../hooks';
import LoginHeader from '../../components/login-header/login-header';
import LoadingScreen from '../loading-screen/loading-screen';
import { AuthorizationStatus } from '../../components/constants/status';
import { changeFavorite, fetchOfferAction } from '../../store/api-actions';
import { useEffect } from 'react';
import { store } from '../../store';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { getSelectedOffer, getisSelectedOfferDataLoading } from '../../store/selected-offer-process/selectors';
import { getOffers } from '../../store/offer-process/selectors';
import { changeSelectedPoint } from '../../store/offer-process/offer-process';
import { useParams } from 'react-router-dom';
import { redirectToRoute } from '../../store/action';
import { AppRoute } from '../../components/constants/app-route';
import { getFavorites } from '../../store/favorite-process/selectors';
import ErrorScreen from '../error-screen/error-screen';
import { NEARBY_COUNT } from '../../const';

function OfferScreen(): JSX.Element {
  const isSelectedOfferDataLoading = useAppSelector(getisSelectedOfferDataLoading);
  const selectedOffer = useAppSelector(getSelectedOffer);
  const offerData = selectedOffer?.offerData;
  const offers = useAppSelector(getOffers);
  const nearbyOffers = selectedOffer?.nearbyOffers;
  const favorites = useAppSelector(getFavorites);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const rating = useAppSelector(getSelectedOffer)?.offerData.rating;
  const selectedOfferId = String(useParams().id);
  const bedrooms = offerData?.bedrooms;
  const maxAdults = offerData?.maxAdults;
  useEffect(() => {
    store.dispatch(fetchOfferAction(selectedOfferId));
    store.dispatch(changeSelectedPoint(undefined));
  }, [selectedOfferId]);
  if (isSelectedOfferDataLoading) {
    return (
      <LoadingScreen />
    );
  }
  if (!selectedOffer) {
    return (
      <ErrorScreen />
    );
  }
  const handleAddFavorite = () => {
    if (authorizationStatus === AuthorizationStatus.NoAuth) {
      store.dispatch(redirectToRoute(AppRoute.Login));
    } else {
      store.dispatch(changeFavorite({
        favorites: favorites,
        offerId: selectedOfferId,
        status: favorites.includes(selectedOfferId) ? 0 : 1
      }));
    }
  };
  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <LoginHeader />
        </div>
      </header>

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {offerData?.images.map((image) => (
                <div className="offer__image-wrapper" key={image}>
                  <img className="offer__image" src={image} alt="Photo studio" />
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {offerData?.isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {offerData?.title}
                </h1>
                <button className={favorites.includes(selectedOfferId) ? 'bookmark-button button offer__bookmark-button offer__bookmark-button--active' : 'offer__bookmark-button button'} onClick={handleAddFavorite} type="button">
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: `${rating ? (rating / 5) * 100 : ''}%` }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {offerData?.type}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {`${bedrooms} ${bedrooms && bedrooms > 1 ? 'Bedrooms' : 'Bedroom'}`}
                </li>
                <li className="offer__feature offer__feature--adults">
                  {`Max ${maxAdults} ${maxAdults && maxAdults > 1 ? 'adults' : 'adult'}`}
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{offerData?.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {offerData?.goods.map((item) => (
                    <li className="offer__inside-item" key={item}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className={`offer__avatar-wrapper ${offerData?.host.isPro ? 'offer__avatar-wrapper--pro' : 'user__avatar-wrapper'}`}>
                    <img className="offer__avatar user__avatar" src={offerData?.host.avatarUrl} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="offer__user-name">
                    {offerData?.host.name}
                  </span>
                  {offerData?.host.isPro && (
                    <span className="offer__user-status">Pro</span>
                  )}
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    {offerData?.description}
                  </p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <ReviewsList reviews={selectedOffer?.reviews} />
                {authorizationStatus === AuthorizationStatus.Auth &&
                  <CommentForm />}
              </section>
            </div>
          </div>
          <section className="offer__map map">
            <Map points={nearbyOffers ? selectedOffer?.nearbyOffers.map((of) => of.location).slice(0, NEARBY_COUNT).concat(selectedOffer.offerData.location) : []} city={nearbyOffers ? selectedOffer?.nearbyOffers[0].city : offers[0].city} />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <CityCardList offers={nearbyOffers?.slice(0, NEARBY_COUNT)} listType={'near'} />
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferScreen;
