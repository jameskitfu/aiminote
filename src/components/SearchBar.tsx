import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  placeholder = "搜索文章标题和内容..." 
}) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
        <Search className="h-5 w-5 text-slate-500 dark:text-brand/70" />
      </div>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        className="block w-full rounded-[1.25rem] border border-slate-300/70 bg-white/32 py-4 pl-12 pr-4 text-sm leading-6 text-slate-900 shadow-soft outline-none transition-all duration-300 placeholder:text-slate-500 focus:border-brand/50 focus:bg-white/48 focus:shadow-panel dark:border-slate-700 dark:bg-slate-950/55 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-brand/40 dark:focus:bg-slate-950"
        placeholder={placeholder}
      />
    </form>
  );
};

export default SearchBar;
