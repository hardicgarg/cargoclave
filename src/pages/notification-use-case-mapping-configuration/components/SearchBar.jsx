import React from 'react';
import Icon from '../../../components/AppIcon';

const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="relative max-w-2xl">
      <div className="absolute inset-y-0 left-0 pl-3 md:pl-4 flex items-center pointer-events-none">
        <Icon name="Search" size="1.125rem" className="text-gray-400 md:w-5 md:h-5" />
      </div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e?.target?.value)}
        placeholder="Search by use case or template name..."
        className="w-full pl-10 md:pl-12 pr-10 md:pr-12 py-2.5 md:py-3 text-sm md:text-base bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
      />
      {searchTerm && (
        <button
          onClick={() => onSearchChange('')}
          className="absolute inset-y-0 right-0 pr-3 md:pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
        >
          <Icon name="X" size="1rem" className="md:w-[18px] md:h-[18px]" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;