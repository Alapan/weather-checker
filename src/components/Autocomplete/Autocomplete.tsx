import { useState, type ChangeEvent } from 'react';

interface AutocompleteProps {
  suggestions: string[];
}

const Autocomplete = ({ suggestions }: AutocompleteProps) => {
  const [inputValue, setInputValue] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    if (value.length >= 3) {
      const modifiedValue = value.toLowerCase();
      setFilteredSuggestions(
        suggestions.filter((suggestion) => suggestion.toLocaleLowerCase().startsWith(modifiedValue))
      );
    } else {
      setFilteredSuggestions([]);
    }

    setInputValue(value);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setHighlightedIndex((prevIndex) => {
          if (prevIndex < filteredSuggestions.length - 1) {
            return prevIndex + 1;
          }
          return 0;
        });
        break;
      case 'ArrowUp':
        event.preventDefault();
        setHighlightedIndex((prevIndex) => {
          if (prevIndex > 0) {
            return prevIndex - 1;
          }
          return filteredSuggestions.length - 1;
        });
        break;
      case 'Enter':
        event.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < filteredSuggestions.length) {
          setInputValue(filteredSuggestions[highlightedIndex]);
          setFilteredSuggestions([]);
          setHighlightedIndex(-1);
        }
        break;
      case 'Escape':
        event.preventDefault();
        setInputValue('');
        setFilteredSuggestions([]);
        setHighlightedIndex(-1);
        break;
      default:
        break;
    }
  };

  const onSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    setFilteredSuggestions([]);
  };

  return (
    <>
      <input
        type="text"
        placeholder="Enter city name"
        value={inputValue}
        onChange={onChange}
        onKeyDown={onKeyDown}
        className="h-12 w-64 shadow-md rounded-md border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent px-4"
        aria-label="Autocomplete input"
        aria-expanded={filteredSuggestions.length > 0}
        aria-controls="suggestions-list"
        role="combobox"
      />
      {filteredSuggestions.length > 0 && (
        <ul
          id="suggestions-list"
          className="absolute bg-white border border-blue-500 rounded-md shadow-lg mt-1 max-h-60 overflow-y-auto list-none p-2"
          onMouseLeave={() => setHighlightedIndex(-1)}
          role="listbox"
          data-testid="suggestions-list"
        >
          {filteredSuggestions.map((suggestion, index) => (
            <li
              className={`cursor-pointer border border-none ${highlightedIndex === index ? 'bg-sky-300' : ''}`}
              key={suggestion}
              onClick={() => onSuggestionClick(suggestion)}
              onMouseEnter={() => setHighlightedIndex(index)}
              role="option"
              aria-selected={highlightedIndex === index}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Autocomplete;
