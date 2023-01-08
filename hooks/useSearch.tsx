import { useRouter } from 'next/router';
import { createContext, lazy, Suspense, useContext, useMemo } from 'react';

const Search = lazy(() => import('@components/Search/Window'));

const SearchContext = createContext<boolean>(false);

export function useSearch() {
  return useContext(SearchContext);
}

export function ProvideSearch({ children }: IChildren) {
  const { asPath } = useRouter();

  const isSearchOpen = useMemo(
    () => asPath.includes('?search=') || asPath.includes('?tag='),
    [asPath]
  );

  return (
    <SearchContext.Provider value={isSearchOpen}>
      {children}

      <Suspense>{isSearchOpen && <Search />}</Suspense>
    </SearchContext.Provider>
  );
}

export default SearchContext;
