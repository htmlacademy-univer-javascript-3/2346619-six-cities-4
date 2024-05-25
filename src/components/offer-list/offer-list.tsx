import {Offer} from '../../types/offer';
import CityCard from '../city-card/city-card';

type OfferPropsList = {
  offers: Offer[];
  listType: 'default' | 'near';
};

function CityCardList({offers, listType}: OfferPropsList): JSX.Element {
  return (
    <div className={`${listType === 'default' ? 'cities__places-list places__list tabs__content' : 'near-places__list places__list'}`}>
      {offers.map((offer) => (
        <CityCard key={offer.id} offer={offer} cardType={listType}/>
      ))}
    </div>
  );
}

export default CityCardList;
