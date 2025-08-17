
import { useState, useCallback, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from './input';
import { Button } from './button';

interface SearchBoxProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  onClear?: () => void;
  initialValue?: string;
  debounceMs?: number;
  showClearButton?: boolean;
}

const SearchBox = ({
  placeholder = "Search...",
  onSearch,
  onClear,
  initialValue = "",
  debounceMs = 300,
  showClearButton = true
}: SearchBoxProps) => {
  const [query, setQuery] = useState(initialValue);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const debouncedSearch = useCallback((searchQuery: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      onSearch(searchQuery);
    }, debounceMs);
  }, [onSearch, debounceMs]);

  useEffect(() => {
    debouncedSearch(query);
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [query, debouncedSearch]);

  const handleClear = () => {
    setQuery("");
    onClear?.();
  };

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-medium" size={18} />
      <Input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="pl-10 pr-10"
      />
      {showClearButton && query && (
        <Button
          type="button"
          variant="ghost" 
          size="sm"
          onClick={handleClear}
          className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
        >
          <X size={14} />
        </Button>
      )}
    </div>
  );
};

export default SearchBox;
