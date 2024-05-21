import { useLocation, useSearchParams } from 'react-router-dom';
('./ui/input');
import { useEffect, useState } from 'react';
import useDebounce from '@/hooks/useDebounce';
import { Input } from './ui/input';

const SearchTodo = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('title');
  const [search, setSearch] = useState(query || '');
  const debouncedSearch = useDebounce({ value: search, delay: 300 });
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (debouncedSearch) {
      setSearchParams({ title: debouncedSearch });
    } else {
      if (pathname === '/') {
        searchParams.delete('title');
        setSearchParams(searchParams);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, pathname]);

  return (
    <Input
      onChange={(e) => {
        setSearch(e.target.value);
      }}
      value={search}
      placeholder="Search for todo..."
      className="bg-white"
    />
  );
};
export default SearchTodo;
