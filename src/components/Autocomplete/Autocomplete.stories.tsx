import type { ComponentProps } from 'react';
import Autocomplete from './Autocomplete';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Components/Autocomplete',
  component: Autocomplete,
  tags: ['autodocs'],
  argTypes: {
    suggestions: {
      control: 'object',
      description: 'Array of suggestions to display in the autocomplete dropdown',
    },
  },
} as Meta<typeof Autocomplete>;

type Story = StoryObj<typeof Autocomplete>;
type AutocompleteProps = ComponentProps<typeof Autocomplete>;

export const Default: Story = {
  args: {
    suggestions: [
      'New York',
      'New Orleans',
      'Kolkata',
      'Helsinki',
      'Tokyo',
      'London',
      'Rio de Janeiro',
      'Paris',
      'Berlin',
      'Moscow',
      'Sydney',
    ].sort(),
  } as AutocompleteProps,
};
