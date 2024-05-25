import {createReducer} from '@reduxjs/toolkit';
import { City } from '../types/city';
import { Offer } from '../types/offer';
import { cities } from '../mocks/cities';
import { offers } from '../mocks/offers';
import { changeCity, getOffers } from './action';

type StateType = {
  city: City;
  offers: Offer[];
}

const initialState: StateType = {
  city: cities[0],
  offers: offers
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getOffers, (state) => {
      state.offers = offers;
    })
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    });
});

export {reducer};
