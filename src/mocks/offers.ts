import { Offer } from '../types/offer';
import { reviews } from './reviews';

export const offers: Offer[] = [
  {
    id: '1',
    title: 'Beautiful & luxurious studio at great location',
    type: 'apartment',
    price: 120,
    isFavorite: true,
    isPremium: true,
    rating: 4,
    reviews: [reviews[0]],
    previewImage: ['img/apartment-01.jpg']
  },
  {
    id: '2',
    title: 'Wood and stone place',
    type: 'room',
    price: 80,
    isFavorite: true,
    isPremium: false,
    rating: 4,
    reviews: [reviews[1]],
    previewImage: ['img/room.jpg']
  },
  {
    id: '3',
    title: 'Canal View Prinsengracht',
    type: 'apartment',
    price: 132,
    isFavorite: false,
    isPremium: false,
    rating: 4,
    reviews: [reviews[2]],
    previewImage: ['img/apartment-02.jpg']
  },
  {
    id: '4',
    title: 'Nice, cozy, warm big bed apartment',
    type: 'apartment',
    price: 180,
    isFavorite: true,
    isPremium: true,
    rating: 5,
    reviews: [reviews[3]],
    previewImage: ['img/apartment-03.jpg']
  },
];
