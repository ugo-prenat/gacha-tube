import { queryOptions } from '@tanstack/react-query';
import { listCards } from './cards.fn';

export const cardsQueryOptions = queryOptions({
  queryKey: ['cards'],
  queryFn: () => listCards()
});
