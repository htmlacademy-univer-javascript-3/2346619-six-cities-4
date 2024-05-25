import {createAction} from '@reduxjs/toolkit';
import { City } from '../types/city';

export const getOffers = createAction('offers/get');

export const changeCity = createAction('city/change', (value: City) => ({
  payload: value
}));
