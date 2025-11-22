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
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-slate-400 dark:text-slate-300" />
      </div>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        className="block w-full pl-10 pr-3 py-2 border border-slate-300 dark:border-slate-700 rounded-xl leading-5 bg-white dark:bg-slate-800 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:placeholder-slate-400 focus:ring-1 focus:ring-brand focus:border-brand sm:text-sm"
        placeholder={placeholder}
      />
    </form>
  );
};

export default SearchBar;
