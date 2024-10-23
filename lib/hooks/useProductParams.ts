import { useQueryState, useQueryStates } from 'nuqs';

export function useProductParams() {
  const [search, setSearch] = useQueryState('search', {
    defaultValue: '',
    parse: (value) => value || '',
    history: 'push',
    shallow: false
  });

  const [{ category, sort, page }, setParams] = useQueryStates({
    category: {
      defaultValue: '',
      parse: (value) => value || '',
    },
    sort: {
      defaultValue: '',
      parse: (value) => value || '',
    },
    page: {
      defaultValue: '1',
      parse: (value) => value || '1',
    },
  }, {
    history: 'push',
  });

  const setCategory = (newCategory: string) => {
    setParams({ category: newCategory, page: '1' });
  };

  const setSort = (newSort: string) => {
    setParams({ sort: newSort, page: '1' });
  };

  const setPage = (newPage: string) => {
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
  };
}