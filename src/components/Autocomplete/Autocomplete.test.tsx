import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Autocomplete from './Autocomplete';

const suggestions = ['Cart', 'Cartoon', 'Draw', 'Drama', 'Drawing', 'Fantasia', 'Fantasy'];

describe('Autocomplete', () => {
  it('should render an input field with placeholder and no suggestions initially', () => {
    render(<Autocomplete suggestions={suggestions} />);
    const input = screen.getByPlaceholderText('Enter city name');
    const suggestionsList = screen.queryByTestId('suggestions-list');
    expect(input).toBeInTheDocument();
    expect(suggestionsList).not.toBeInTheDocument();
  });

  it('should filter suggestions based on input', () => {
    render(<Autocomplete suggestions={suggestions} />);
    const input = screen.getByPlaceholderText('Enter city name');
    fireEvent.change(input, { target: { value: 'Car' } });
    const suggestionsList = screen.getByTestId('suggestions-list');
    expect(suggestionsList).toBeInTheDocument();
    expect(suggestionsList.children.length).toBe(2);
  });

  it('should highlight suggestions using ArrowDown key and select on Enter', () => {
    render(<Autocomplete suggestions={suggestions} />);
    const input = screen.getByPlaceholderText('Enter city name');
    fireEvent.change(input, { target: { value: 'Car' } });
    const suggestionsList = screen.getByTestId('suggestions-list');
    expect(suggestionsList).toBeInTheDocument();
    const firstSuggestion = suggestionsList.children[0];
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    expect(firstSuggestion).toHaveClass('bg-sky-300');
    fireEvent.keyDown(input, { key: 'Enter' });
    expect((input as HTMLInputElement).value).toBe('Cart');
    waitFor(() => {
      expect(screen.queryByTestId('suggestions-list')).not.toBeInTheDocument();
    });
  });

  it('should clear suggestions on pressing Escape', () => {
    render(<Autocomplete suggestions={suggestions} />);
    const input = screen.getByPlaceholderText('Enter city name');
    fireEvent.change(input, { target: { value: 'Car' } });
    const suggestionsList = screen.getByTestId('suggestions-list');
    expect(suggestionsList).toBeInTheDocument();
    fireEvent.keyDown(input, { key: 'Escape' });
    expect((input as HTMLInputElement).value).toBe('');
    waitFor(() => {
      expect(screen.queryByTestId('suggestions-list')).not.toBeInTheDocument();
    });
  });

  it('should highlight suggestions on mouse hover and select on click', () => {
    render(<Autocomplete suggestions={suggestions} />);
    const input = screen.getByPlaceholderText('Enter city name');
    fireEvent.change(input, { target: { value: 'Car' } });
    const suggestionsList = screen.getByTestId('suggestions-list');
    expect(suggestionsList).toBeInTheDocument();
    const firstSuggestion = suggestionsList.children[0];
    fireEvent.mouseOver(firstSuggestion);
    expect(firstSuggestion).toHaveClass('bg-sky-300');
    fireEvent.click(firstSuggestion);
    expect((input as HTMLInputElement).value).toBe('Cart');
    waitFor(() => {
      expect(screen.queryByTestId('suggestions-list')).not.toBeInTheDocument();
    });
  });

  it('should not filter suggestions if input length is less than 3', () => {
    render(<Autocomplete suggestions={suggestions} />);
    const input = screen.getByPlaceholderText('Enter city name');
    fireEvent.change(input, { target: { value: 'Ca' } });
    const suggestionsList = screen.queryByTestId('suggestions-list');
    expect(suggestionsList).not.toBeInTheDocument();
    expect((input as HTMLInputElement).value).toBe('Ca');
  });

  it('should highlight suggestions using ArrowUp key', () => {
    render(<Autocomplete suggestions={suggestions} />);
    const input = screen.getByPlaceholderText('Enter city name');
    fireEvent.change(input, { target: { value: 'Car' } });
    const suggestionsList = screen.getByTestId('suggestions-list');
    expect(suggestionsList).toBeInTheDocument();
    const firstSuggestion = suggestionsList.children[0];
    const secondSuggestion = suggestionsList.children[1];
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    expect(firstSuggestion).toHaveClass('bg-sky-300');
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    expect(secondSuggestion).toHaveClass('bg-sky-300');
    fireEvent.keyDown(input, { key: 'ArrowUp' });
    expect(firstSuggestion).toHaveClass('bg-sky-300');
    expect(secondSuggestion).not.toHaveClass('bg-sky-300');
    fireEvent.keyDown(input, { key: 'Enter' });
    expect((input as HTMLInputElement).value).toBe('Cart');
  });

  it('does not highlight any suggestion when mouse leaves the suggestions list', () => {
    render(<Autocomplete suggestions={suggestions} />);
    const input = screen.getByPlaceholderText('Enter city name');
    fireEvent.change(input, { target: { value: 'Car' } });
    const suggestionsList = screen.getByTestId('suggestions-list');
    expect(suggestionsList).toBeInTheDocument();
    const firstSuggestion = suggestionsList.children[0];
    fireEvent.mouseOver(firstSuggestion);
    expect(firstSuggestion).toHaveClass('bg-sky-300');
    fireEvent.mouseLeave(suggestionsList);
    expect(firstSuggestion).not.toHaveClass('bg-sky-300');
    fireEvent.click(firstSuggestion);
    expect((input as HTMLInputElement).value).toBe('Cart');
    waitFor(() => {
      expect(screen.queryByTestId('suggestions-list')).not.toBeInTheDocument();
    });
  });

  it('does not show the suggestions list when no suggestion is found', () => {
    render(<Autocomplete suggestions={suggestions} />);
    const input = screen.getByPlaceholderText('Enter city name');
    fireEvent.change(input, { target: { value: 'Hello' } });
    expect((input as HTMLInputElement).value).toBe('Hello');
    const suggestionsList = screen.queryByTestId('suggestions-list');
    expect(suggestionsList).not.toBeInTheDocument();
  });

  it('wraps to the first suggestion when ArrowDown is pressed at the last suggestion', () => {
    render(<Autocomplete suggestions={suggestions} />);
    const input = screen.getByPlaceholderText('Enter city name');
    fireEvent.change(input, { target: { value: 'Car' } });
    const suggestionsList = screen.getByTestId('suggestions-list');
    expect(suggestionsList).toBeInTheDocument();
    const firstSuggestion = suggestionsList.children[0];
    const lastSuggestion = suggestionsList.children[suggestionsList.children.length - 1];
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    expect(firstSuggestion).toHaveClass('bg-sky-300');
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    expect(lastSuggestion).toHaveClass('bg-sky-300');
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    expect(firstSuggestion).toHaveClass('bg-sky-300');
  });

  it('wraps to the last suggestion when ArrowUp is pressed at the first suggestion', () => {
    render(<Autocomplete suggestions={suggestions} />);
    const input = screen.getByPlaceholderText('Enter city name');
    fireEvent.change(input, { target: { value: 'Car' } });
    const suggestionsList = screen.getByTestId('suggestions-list');
    expect(suggestionsList).toBeInTheDocument();
    const firstSuggestion = suggestionsList.children[0];
    const lastSuggestion = suggestionsList.children[suggestionsList.children.length - 1];
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    expect(firstSuggestion).toHaveClass('bg-sky-300');
    fireEvent.keyDown(input, { key: 'ArrowUp' });
    expect(lastSuggestion).toHaveClass('bg-sky-300');
  });
});
