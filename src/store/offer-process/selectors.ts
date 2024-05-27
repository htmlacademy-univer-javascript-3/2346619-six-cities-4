import { NameSpace } from '../../const';
import { Offer } from '../../types/offer';
import { Point } from '../../types/point';
import { State } from '../../types/state';

export const getFilterType = (state: State): string => state[NameSpace.Offers].filterType;
export const getOffers = (state: State): Offer[] => state[NameSpace.Offers].offers;
export const getCity = (state: State): string => state[NameSpace.Offers].city;
export const getSelectedPoint = (state: State): undefined | Point => state[NameSpace.Offers].selectedPoint;
export const getIsOfferDataLoading = (state: State): boolean => state[NameSpace.Offers].isOffersDataLoading;
