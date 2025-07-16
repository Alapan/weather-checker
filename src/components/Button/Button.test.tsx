import { screen, render, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  it('should render a button with the correct label and default disabled state', () => {
    render(<Button label="Click Me" onClick={() => {}} />);
    const button = screen.getByRole('button', { name: 'Click Me' });
    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
  });

  it('renders a disabled button when the disabled prop is true', () => {
    render(<Button label="Disabled button" onClick={() => {}} disabled={true} />);
    const button = screen.getByRole('button', { name: 'Disabled button' });
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  it('should call onClick function when clicked', () => {
    const handleClick = jest.fn();
    render(<Button label="Click me" onClick={handleClick} />);
    fireEvent.click(screen.getByRole('button', { name: 'Click me' }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
