import { NameSpace } from '../../const';
import { Offer } from '../../types/offer';
import { State } from '../../types/state';

export const getFavorites = (state: State): string[] => state[NameSpace.FavoriteProcess].favorites;
export const getFetchedFavorites = (state: State): Offer[] => state[NameSpace.FavoriteProcess].fetchedFavorites;
export const getIsFavoriteLoading = (state: State): boolean => state[NameSpace.FavoriteProcess].isFavoriteLoading;
