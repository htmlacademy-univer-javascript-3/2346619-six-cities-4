import { NameSpace } from '../../const';
import { SelectedOffer } from '../../types/selected-offer';
import { State } from '../../types/state';

export const getSelectedOffer = (state: State): SelectedOffer | undefined => state[NameSpace.SelectedOffer].selectedOffer;
export const getisSelectedOfferDataLoading = (state: State): boolean => state[NameSpace.SelectedOffer].isSelectedOfferDataLoading;
