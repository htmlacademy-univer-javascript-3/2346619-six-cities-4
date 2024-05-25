import getFilter from '../../const';
import { useAppSelector } from '../../hooks';
import {Offer} from '../../types/offer';
import CityCard from '../city-card/city-card';

type OfferPropsList = {
  offers: Offer[];
  listType: 'default' | 'near';
};

function CityCardList({offers, listType}: OfferPropsList): JSX.Element {
  const filterType = useAppSelector((state) => state.filterType);
  return (
    <div className={`${listType === 'default' ? 'cities__places-list places__list tabs__content' : 'near-places__list places__list'}`}>
      {getFilter(offers, filterType)?.map((offer) => (
        <CityCard key={offer.id} offer={offer} cardType={listType}/>
      ))}
    </div>
  );
}

export default CityCardList;
