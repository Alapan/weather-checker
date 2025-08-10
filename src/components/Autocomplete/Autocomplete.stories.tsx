import { useState, type ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import Autocomplete from './Autocomplete';

export default {
  title: 'Components/Autocomplete',
  component: Autocomplete,
  tags: ['autodocs'],
  argTypes: {
    inputValue: {
      control: 'text',
      description: 'The current value of the input field.',
    },
    updateInputValue: {
      control: {
        action: 'inputChange', 
      },
      description: 'Function to update the input value. It receives the new value as an argument.',
    },
    label: {
      control: 'text',
      description: 'Placeholder text for the input field.',
    },
    suggestions: {
      control: 'object',
      description: 'Array of suggestions to display in the autocomplete dropdown',
    },
    handleInputChange: {
      control: {
        action: 'inputChange', 
      },
      description: 'Function to handle input changes. It receives the current input value as an argument.',
    }
  },
} as Meta<typeof Autocomplete>;

type Story = StoryObj<typeof Autocomplete>;
type AutocompleteProps = ComponentProps<typeof Autocomplete>;

export const Default: Story = {
  render: (args: AutocompleteProps) => {
    const [inputValue, setInputValue] = useState(args.inputValue || '');
    return (
      <Autocomplete
        inputValue={inputValue}
        updateInputValue={setInputValue}
        handleInputChange={(searchStr: string) => {
          console.log('Input changed:', searchStr);
        }}
        suggestions={[
          'Cart',
          'Cartoon',
          'Draw',
          'Drama',
          'Drawing',
          'Drawing board',
          'Fantasia',
          'Fantasy',
        ]}
        label={args.label || 'Enter word'}
      />
    );
  }
};

export const Empty: Story = {
  args: {
    inputValue: '',
    updateInputValue: () => null,
    label: 'Enter city name',
    suggestions: [],
    handleInputChange: () => null,
  } as AutocompleteProps
}
