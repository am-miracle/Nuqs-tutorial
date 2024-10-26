import { useQueryState, useQueryStates, parseAsString, parseAsInteger, createParser } from 'nuqs';
import { useTransition } from 'react';
import { z } from 'zod';

const SortSchema = z.enum(['', 'price-asc', 'price-desc', 'rating']);
type SortOption = z.infer<typeof SortSchema>;

const zodSortParser = createParser({
  parse: (value: string | null): SortOption => {
    const result = SortSchema.safeParse(value ?? '');
    return result.success ? result.data : '';
  },
  serialize: (value: SortOption) => value,
});
export function useProductParams() {
    const [isPending, startTransition] = useTransition();

  const [search, setSearch] = useQueryState('search',
      parseAsString.withDefault('').withOptions({
          shallow: false,
          history: 'push',
          startTransition
      })
  );

  const [{ category, sort, page }, setParams] = useQueryStates({
      category: parseAsString.withDefault(""),
      sort: zodSortParser.withDefault("" as SortOption),
      page: parseAsInteger.withDefault(1),
  }, {
      history: 'push',
      shallow: false,
      startTransition
  });

  const setCategory = (newCategory: string) => {
    setParams({ category: newCategory, page: 1 });
  };

  const setSort = (newSort: SortOption) => {
    setParams({ sort: newSort, page: 1 });
  };

  const setPage = (newPage: number) => {
    setParams({ page: newPage });
  };

  return {
    search,
    setSearch,
    category,
    setCategory,
    sort,
    setSort,
      page,
      setPage,
    isPending
  };
}