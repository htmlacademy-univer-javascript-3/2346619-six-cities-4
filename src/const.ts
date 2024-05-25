import { Offer } from './types/offer';

const getFilter = (offers: Offer[], filterType: string): Offer[] | undefined => {
  const defaultOffers = offers.slice();
  switch (filterType) {
    case 'Popular':
      return offers;
    case 'Price: low to high':
      return defaultOffers.sort((a, b) => a.price - b.price);
    case 'Price: high to low':
      return defaultOffers.sort((a, b) => b.price - a.price);
    case 'Top rated first':
      return defaultOffers.sort((a, b) => b.rating - a.rating);
  }
};

export default getFilter;
