import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const getFavorites = (state: State): string[] => state[NameSpace.FavoriteProcess].favorites;
