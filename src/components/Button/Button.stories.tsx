import type { StoryObj } from '@storybook/react-vite';
import Button from './Button';
import type { ComponentProps } from 'react';

export default {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'The text to display on the button',
      defaultValue: 'Click Me',
    },
    disabled: {
      control: 'boolean',
      description: 'Optional prop to disable the button',
      defaultValue: false,
    },
    onClick: {
      action: 'clicked',
      description: 'Function to call when the button is clicked',
    },
  },
};

type Story = StoryObj<typeof Button>;
type ButtonProps = ComponentProps<typeof Button>;

export const Default: Story = {
  args: {
    label: 'Click Me',
    disabled: false,
    onClick: () => {
      console.log('Button clicked');
    },
  } as ButtonProps,
};
