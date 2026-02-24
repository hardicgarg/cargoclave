import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const SearchBar = ({ onSearch, suggestions = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  useEffect(() => {
    if (searchTerm?.length > 0) {
      const filtered = suggestions?.filter(
        (suggestion) =>
          suggestion?.toLowerCase()?.includes(searchTerm?.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(filtered?.length > 0);
    } else {
      setShowSuggestions(false);
    }
  }, [searchTerm, suggestions]);

  const handleSearch = (value) => {
    setSearchTerm(value);
    onSearch(value);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    onSearch(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className="relative">
      <div className="relative">
        <Icon
          name="Search"
          size="1.25rem"
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          type="search"
          placeholder="Search by Contract ID or Customer Name..."
          value={searchTerm}
          onChange={(e) => handleSearch(e?.target?.value)}
          className="pl-10 pr-10"
        />
        {searchTerm && (
          <button
            onClick={() => handleSearch('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-150"
          >
            <Icon name="X" size="1rem" />
          </button>
        )}
      </div>
      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto animate-fade-in">
          {filteredSuggestions?.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-muted transition-colors duration-150 flex items-center gap-2"
            >
              <Icon name="Search" size="0.875rem" className="text-muted-foreground" />
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;