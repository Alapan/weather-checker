import type { ComponentProps } from 'react';
import WeatherDetailsView from './WeatherDetailsView';
import type { StoryObj } from '@storybook/react';

export default {
  title: 'Components/WeatherDetailsView',
  component: WeatherDetailsView,
  tags: ['autodocs'],
  argTypes: {
    weatherData: {
      temperatureCelsius: {
        control: 'number',
        description: 'Temperature in Celsius',
        defaultValue: 15,
      },
      feelsLikeCelsius: {
        control: 'number',
        description: 'Feels like temperature in Celsius',
      },
      city: {
        control: 'text',
        description: 'City name',
      },
      conditionCode: {
        control: 'number',
        description: 'Weather condition code from API',
        defaultValue: 1200,
      },
      localTime: {
        control: 'text',
        description: 'local time in the city (format: YYYY-MM-DD HH:mm)',
      },
      humidity: {
        control: 'number',
        description: 'Humidity percentage',
      },
      windSpeedMph: {
        control: 'number',
        description: 'Wind speed in miles per hour',
      },
    },
    width: {
      control: 'number',
      description: 'Width of the Rive animation',
    },
    height: {
      control: 'number',
      description: 'Height of the Rive animation',
    },
  },
};

type Story = StoryObj<typeof WeatherDetailsView>;
type WeatherDetailsViewProps = ComponentProps<typeof WeatherDetailsView>;

export const Default: Story = {
  args: {
    weatherData: {
      temperatureCelsius: 6,
      feelsLikeCelsius: 5,
      condition: 'Windy',
      conditionCode: 2000,
      city: 'Dundee',
      localTime: '2026-03-12 16:15',
      humidity: 79,
      windSpeedMph: 18,
    } as WeatherDetailsViewProps['weatherData'],
  },
};

export const PartlyCloudy: Story = {
  args: {
    weatherData: {
      temperatureCelsius: 6,
      feelsLikeCelsius: 12,
      condition: 'Partly cloudy',
      conditionCode: 1003,
      city: 'San Francisco',
      localTime: '2026-03-12 14:00',
      humidity: 71,
      windSpeedMph: 15.6,
    } as WeatherDetailsViewProps['weatherData'],
    width: 500,
    height: 200,
  },
};

export const Rainy: Story = {
  args: {
    weatherData: {
      temperatureCelsius: 4,
      feelsLikeCelsius: 3,
      condition: 'Heavy rain',
      conditionCode: 1195,
      city: 'Bergen',
      localTime: '2026-03-12 17:00',
      humidity: 93,
      windSpeedMph: 25,
    } as WeatherDetailsViewProps['weatherData'],
  },
};
