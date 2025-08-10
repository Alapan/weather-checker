import { useEffect, useState, type ChangeEvent } from 'react';

interface AutocompleteProps {
  inputValue: string;
  label: string;
  suggestions: string[];
  updateInputValue: (value: string) => void;
  handleInputChange: (searchStr: string) => void;
}

const Autocomplete = ({
  inputValue,
  updateInputValue,
  suggestions,
  handleInputChange,
  label
}: AutocompleteProps) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const MINIMUM_LENGTH_TO_SHOW_SUGGESTIONS = 4;

  useEffect(() => {
    if (inputValue.length >= MINIMUM_LENGTH_TO_SHOW_SUGGESTIONS) {
      const modifiedValue = inputValue.toLowerCase();
      setFilteredSuggestions(
        suggestions.filter((suggestion) => suggestion.toLocaleLowerCase().startsWith(modifiedValue))
      );
    } else {
      setFilteredSuggestions([]);
    }
  }, [inputValue, suggestions]);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    updateInputValue(value);

    if (value.length >= MINIMUM_LENGTH_TO_SHOW_SUGGESTIONS) {
      handleInputChange(value.toLowerCase());
    }
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
          updateInputValue(filteredSuggestions[highlightedIndex]);
          setFilteredSuggestions([]);
          setHighlightedIndex(-1);
        }
        break;
      case 'Escape':
        event.preventDefault();
        updateInputValue('');
        setFilteredSuggestions([]);
        setHighlightedIndex(-1);
        break;
      default:
        break;
    }
  };

  const onSuggestionClick = (suggestion: string) => {
    updateInputValue(suggestion);
    setFilteredSuggestions([]);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLLIElement>, index: number) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      onSuggestionClick(filteredSuggestions[index]);
    }
  }

  return (
    <>
      <input
        type="text"
        placeholder={label}
        value={inputValue}
        onChange={onChange}
        onKeyDown={onKeyDown}
        className="h-12 w-64 shadow-md rounded-md border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent px-4"
        aria-label="Autocomplete input"
        role="combobox"
      />
      {filteredSuggestions.length > 0 && (
        <ul
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
              onKeyDown={(event) => handleKeyDown(event, index)}
              role="option"
              aria-selected={highlightedIndex === index}
              tabIndex={0}
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
