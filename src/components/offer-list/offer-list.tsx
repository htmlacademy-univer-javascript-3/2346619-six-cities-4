import { memo, useMemo } from 'react';
import {getFilterSorting} from '../../const';
import { useAppSelector } from '../../hooks';
import {Offer} from '../../types/offer';
import OfferCard from '../offer-card/offer-card';
import { getFilterType } from '../../store/offer-process/selectors';

type OfferPropsList = {
  offers: Offer[] | undefined;
  listType: 'default' | 'near' | 'favorite';
};

function CityCardListComponent({offers, listType}: OfferPropsList): JSX.Element {
  const filterType = useAppSelector(getFilterType);
  return (
    <div className={`${listType === 'default' ? 'cities__places-list places__list tabs__content' : 'near-places__list places__list'}`}>
      {useMemo(() => getFilterSorting(offers, filterType), [offers, filterType])?.map((offer) => (
        <OfferCard key={offer.id} offer={offer} cardType={listType}/>
      ))}
    </div>
  );
}

const CityCardList = memo(CityCardListComponent);

export default CityCardList;
