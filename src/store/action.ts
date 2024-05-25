import {createAction} from '@reduxjs/toolkit';
import { City } from '../types/city';
import { Point } from '../types/point';

export const getOffers = createAction('offers/get');

export const changeCity = createAction('city/change', (value: City) => ({
  payload: value
}));

export const changeFilter = createAction('filter/change', (value: string) => ({
  payload: value
}));

export const changeSelectedPoint = createAction('selectedPoint/change', (value: Point | undefined) => ({
  payload: value
}));
