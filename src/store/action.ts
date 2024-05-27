import {createAction} from '@reduxjs/toolkit';
import { Point } from '../types/point';
import { Offer } from '../types/offer';
import { AuthorizationStatus } from '../components/constants/status';
import { AppRoute } from '../components/constants/app-route';
import { SelectedOffer } from '../types/selected-offer';
import { Review } from '../types/review';

export const changeCity = createAction('city/change', (value: string) => ({
  payload: value
}));

export const changeFilter = createAction('filter/change', (value: string) => ({
  payload: value
}));

export const changeSelectedPoint = createAction('selectedPoint/change', (value: Point | undefined) => ({
  payload: value
}));

export const loadOffers = createAction<Offer[]>('data/loadOffers');

export const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');

export const setError = createAction<string | null>('offer/setError');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const saveEmail = createAction<string>('user/saveEmail');

export const redirectToRoute = createAction<AppRoute>('offer/redirectToRoute');

export const addFavorite = createAction<string[]>('favorite/add');

export const showMessageInitial = createAction<boolean>('data/show');

export const loadSelectedOffer = createAction<SelectedOffer>('offer/load');

export const setSelectedOfferDataLoadingStatus = createAction<boolean>('offer/setSelectedOfferDataLoadingStatus');

export const loadSelectedOfferComments = createAction<Review[]>('offer/loadComment');
