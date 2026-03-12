import { screen, render } from '@testing-library/react';
import WeatherDetailsView from './WeatherDetailsView';

jest.mock('../../hooks/useRiveAnimation', () => ({
  useRiveAnimation: () => () => <div data-testid="rive-animation" />,
}));

const defaultInput = {
  weatherData: {
    temperatureCelsius: 6,
    feelsLikeCelsius: 5,
    condition: 'Windy',
    conditionCode: 2000,
    city: 'Dundee',
    localTime: '2026-03-12 16:15',
    humidity: 79,
    windSpeedMph: 18,
  },
};

describe('WeatherDetailsView', () => {
  it('shows the correct weather details based on provided input', () => {
    render(<WeatherDetailsView {...defaultInput} />);
    expect(screen.getByText('Windy')).toBeInTheDocument();
    expect(screen.getByText('Dundee')).toBeInTheDocument();
    expect(screen.getByText('6°C')).toBeInTheDocument();
    expect(screen.getByText(/Feels\s*like.*5.*°C/i)).toBeInTheDocument();
    expect(screen.getByText('Humidity: 79%')).toBeInTheDocument();
    expect(screen.getByText(/Wind.*18.*mph/i)).toBeInTheDocument();
  });
});
