import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Autocomplete from './Autocomplete';

const defaultProps = {
  inputValue: '',
  updateInputValue: jest.fn(),
  suggestions: [
    'Cart',
    'Cartoon',
    'Draw',
    'Drama',
    'Drawing',
    'Drawing board',
    'Fantasia',
    'Fantasy',
  ],
  handleInputChange: jest.fn(),
  label: 'Enter word',
};

describe('Autocomplete', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render an input field with placeholder and no suggestions initially', () => {
    render(<Autocomplete {...defaultProps} />);
    const input = screen.getByPlaceholderText('Enter word');
    const suggestionsList = screen.queryByTestId('suggestions-list');
    expect(input).toBeInTheDocument();
    expect(suggestionsList).not.toBeInTheDocument();
  });

  it('should display suggestions when input value changes', async () => {
    render(<Autocomplete {...defaultProps} inputValue='Draw'/>);
    await waitFor(() => {
      const suggestionsList = screen.getByTestId('suggestions-list');
      expect(suggestionsList).toBeInTheDocument();
      expect(suggestionsList.children.length).toBeGreaterThan(0);
      expect(suggestionsList).toHaveTextContent('Draw');
      expect(suggestionsList).toHaveTextContent('Drawing');
    });
  });

  it('should call updateInputValue when a letter is typed in the input', () => {
    render(<Autocomplete {...defaultProps} />);
    const input = screen.getByPlaceholderText('Enter word');
    fireEvent.change(input, { target: { value: 'D' } });
    expect(defaultProps.updateInputValue).toHaveBeenCalledWith('D');
  });

  it('should not display suggestions if input length is less than 4', () => {
    render(<Autocomplete {...defaultProps} inputValue='Dra' />);
    const suggestionsList = screen.queryByTestId('suggestions-list');
    expect(suggestionsList).not.toBeInTheDocument();
  });

  it('should call handleInputChange when input value is 4 or more characters', () => {
    render(<Autocomplete {...defaultProps} inputValue='Draw' />);
    const input = screen.getByPlaceholderText('Enter word');
    fireEvent.change(input, { target: { value: 'Drawi' } });
    expect(defaultProps.handleInputChange).toHaveBeenCalledWith('drawi');
  });

  it('should highlight suggestions on arrow key navigation', async () => {
    render(<Autocomplete {...defaultProps} inputValue='Draw' />);
    const input = screen.getByPlaceholderText('Enter word');
    fireEvent.change(input, { target: { value: 'Drawi' } });
    
    await waitFor(() => {
      const suggestionsList = screen.getByTestId('suggestions-list');
      expect(suggestionsList).toBeInTheDocument();
      fireEvent.keyDown(input, { key: 'ArrowDown' });
      expect(suggestionsList.children[0]).toHaveClass('bg-sky-300');
      fireEvent.keyDown(input, { key: 'ArrowDown' });
      expect(suggestionsList.children[1]).toHaveClass('bg-sky-300');
      fireEvent.keyDown(input, { key: 'ArrowUp' });
      expect(suggestionsList.children[0]).toHaveClass('bg-sky-300');
    });
  });

  it('should clear suggestions on Escape key press', async () => {
    render(<Autocomplete {...defaultProps} inputValue='Draw' />);
    const input = screen.getByPlaceholderText('Enter word');
    fireEvent.change(input, { target: { value: 'Drawi' }});

    await waitFor(() => {
      const suggestionsList = screen.getByTestId('suggestions-list');
      expect(suggestionsList).toBeInTheDocument();
      fireEvent.keyDown(input, { key: 'Escape' });
      expect(suggestionsList).not.toBeInTheDocument();
    });
  });

  it('should select suggestion on Enter key press', async () => {
    render(<Autocomplete {...defaultProps} inputValue='Drawin' />);
    const input = screen.getByPlaceholderText('Enter word');
    fireEvent.change(input, { target: { value: 'Drawi' } });

    await waitFor(() => {
      const suggestionsList = screen.getByTestId('suggestions-list');
      expect(suggestionsList).toBeInTheDocument();
      fireEvent.keyDown(input, { key: 'ArrowDown' });
      expect(suggestionsList.children[0]).toHaveClass('bg-sky-300');
      fireEvent.keyDown(input, { key: 'Enter' });
      expect(suggestionsList).not.toBeInTheDocument();
    });
  });

  it('should select the suggestion on mouse click', async () => {
    render(<Autocomplete {...defaultProps} inputValue='Draw' />);
    const input = screen.getByPlaceholderText('Enter word');
    fireEvent.change(input, { target: { value: 'Drawi' } });

    await waitFor(() => {
      const suggestionsList = screen.getByTestId('suggestions-list');
      expect(suggestionsList).toBeInTheDocument();
      const firstSuggestion = suggestionsList.children[0];
      fireEvent.click(firstSuggestion);
      expect(defaultProps.updateInputValue).toHaveBeenCalledWith('Drawi');
      expect(suggestionsList).not.toBeInTheDocument();
    });
  });

  it('should leave suggestions unchanged when any key other than ArrowDown, ArrowUp, Enter, or Escape is pressed', async () => {
    render(<Autocomplete {...defaultProps} inputValue='Draw' />);
    const input = screen.getByPlaceholderText('Enter word');
    fireEvent.change(input, { target: { value: 'Drawi' } });

    await waitFor(() => {
      const suggestionsList = screen.getByTestId('suggestions-list');
      expect(suggestionsList).toBeInTheDocument();
      fireEvent.keyDown(input, { key: 'a' });
      expect(suggestionsList).toBeInTheDocument();
    });
  });

  it('should display the last suggestion when the ArrowUp key is pressed at the top of the list', async () => {
    render(<Autocomplete {...defaultProps} inputValue='Draw' />);
    const input = screen.getByPlaceholderText('Enter word');
    fireEvent.change(input, { target: { value: 'Drawi' } });

    await waitFor(() => {
      const suggestionsList = screen.getByTestId('suggestions-list');
      expect(suggestionsList).toBeInTheDocument();
      fireEvent.keyDown(input, { key: 'ArrowUp' });
      expect(suggestionsList.children[suggestionsList.children.length - 1]).toHaveClass('bg-sky-300');
    });
  });

  it('should not highlight any suggestion when mouse leaves the suggestions list', async () => {
    render(<Autocomplete {...defaultProps} inputValue='Draw' />);
    const input = screen.getByPlaceholderText('Enter word');
    fireEvent.change(input, { target: { value: 'Drawi' }});

    waitFor(() => {
      const suggestionsList = screen.getByTestId('suggestions-list');
      expect(suggestionsList).toBeInTheDocument();
      fireEvent.mouseEnter(suggestionsList);
      expect(suggestionsList.children[0]).toHaveClass('bg-sky-300');
      fireEvent.mouseLeave(suggestionsList);
      expect(suggestionsList.children[0]).not.toHaveClass('bg-sky-300');
    });
  });

  it('should highlight the first suggestion when the ArrowDown key is pressed on the last suggestion', async () => {
    render(<Autocomplete {...defaultProps} inputValue='Draw' />);
    const input = screen.getByPlaceholderText('Enter word');
    fireEvent.change(input, { target: { value: 'Drawi' }});

    waitFor(() => {
      const suggestionsList = screen.getByTestId('suggestions-list');
      expect(suggestionsList).toBeInTheDocument();
      fireEvent.keyDown(input, { key: 'ArrowDown' });
      expect(suggestionsList.children[0]).toHaveClass('bg-sky-300');
      fireEvent.keyDown(input, { key: 'ArrowDown' });
      expect(suggestionsList.children[1]).toHaveClass('bg-sky-300');
      fireEvent.keyDown(input, { key: 'ArrowDown' });
      expect(suggestionsList.children[0]).toHaveClass('bg-sky-300');
    });    
  });

  it('should select suggestion when Enter is pressed on a list item', async () => {


    render(<Autocomplete {...defaultProps} inputValue="Draw"/>);

    const input = screen.getByPlaceholderText('Enter word');
    fireEvent.change(input, { target: { value: 'Drawi' } });

    const listItem = await screen.findByText('Drawing');
    listItem.focus();
    fireEvent.keyDown(listItem, { key: 'Enter' });

    expect(defaultProps.updateInputValue).toHaveBeenCalledWith('Drawing');
  });

});
