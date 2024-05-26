import {createAction} from '@reduxjs/toolkit';
import { Point } from '../types/point';
import { Offer } from '../types/offer';

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
