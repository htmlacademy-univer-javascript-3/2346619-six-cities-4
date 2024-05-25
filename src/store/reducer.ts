import {createReducer} from '@reduxjs/toolkit';
import { City } from '../types/city';
import { Offer } from '../types/offer';
import { cities } from '../mocks/cities';
import { offers } from '../mocks/offers';
import { changeCity, changeFilter, changeSelectedPoint, getOffers } from './action';
import { Point } from '../types/point';

type StateType = {
  city: City;
  offers: Offer[];
  filterType: string;
  selectedPoint: Point | undefined;
}

const initialState: StateType = {
  city: cities[0],
  offers: offers,
  filterType: 'Popular',
  selectedPoint: undefined
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getOffers, (state) => {
      state.offers = offers;
    })
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(changeFilter, (state, action) => {
      state.filterType = action.payload;
    })
    .addCase(changeSelectedPoint, (state, action) => {
      state.selectedPoint = action.payload;
    });
});

export {reducer};
