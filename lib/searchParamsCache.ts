// lib/searchParamsCache.ts
import { createSearchParamsCache, parseAsString, parseAsInteger } from 'nuqs/server';

export const searchParamsCache = createSearchParamsCache({
  search: parseAsString.withDefault(''),
  category: parseAsString.withDefault(''),
  sort: parseAsString.withDefault(''),
  page: parseAsInteger.withDefault(1)
})