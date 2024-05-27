import { AuthorizationStatus } from '../components/constants/status.js';
import {store} from '../store/index.js';
import { Offer } from './offer.js';
import { Point } from './point.js';
import { SelectedOffer } from './selected-offer.js';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  email: string;
};

export type ErrorProcess = {
  error: null | string;
}

export type SelectedOfferProcess = {
  selectedOffer: SelectedOffer | undefined;
  isSelectedOfferDataLoading: boolean;
  isCommentPosting: boolean;
  isCommentRejected: boolean;
}

export type FavoriteProcess = {
  favorites: string[];
  fetchedFavorites: Offer[];
  isFavoriteLoading: boolean;
}

export type OfferProcess = {
  city: string;
  offers: Offer[];
  filterType: string;
  selectedPoint: Point | undefined;
  isOffersDataLoading: boolean;
  hasError: boolean;
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
