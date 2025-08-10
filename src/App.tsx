import { useState } from 'react';
import './App.css';
import Autocomplete from './components/Autocomplete/Autocomplete';
import Button from './components/Button/Button';
import type { WeatherApiResponse } from './types';

const WEATHER_API_URL = import.meta.env.VITE_WEATHER_API_URL;
const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

function App() {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [weatherData, setWeatherData] = useState<WeatherApiResponse | null>(null);

  const updateInputValue = (value: string) => {
    setInputValue(value);
  };

  const filterUniqueSuggestions = (suggestions: string[]) => suggestions.filter((suggestion: string, index: number) => suggestions.indexOf(suggestion) === index);

  const handleInputChange = async (searchStr: string) => {
    const response = await fetch(`${WEATHER_API_URL}search.json?key=${WEATHER_API_KEY}&q=${searchStr}`);
    const results = await response.json();
    const suggestions = filterUniqueSuggestions(results.map((result: { name: string }) => result.name));
    setSuggestions(suggestions);
  };

  const fetchWeather = async () => {
    if (!inputValue) {
      setWeatherData(null);
      return;
    };
    const response = await fetch(`${WEATHER_API_URL}current.json?key=${WEATHER_API_KEY}&q=${inputValue}`);
    const weatherData = await response.json();
    setWeatherData({
      temperatureCelsius: weatherData.current.temp_c,
      temperatureFahrenheit: weatherData.current.temp_f,
      condition: weatherData.current.condition.text,
      city: weatherData.location.name,
      humidity: weatherData.current.humidity,
      windSpeedKph: weatherData.current.wind_kph,
      windSpeedMph: weatherData.current.wind_mph,
      feelsLikeCelsius: weatherData.current.feelslike_c,
      feelsLikeFahrenheit: weatherData.current.feelslike_f,
      localTime: weatherData.location.localtime
    } as WeatherApiResponse);
  };

  return (
    <main className='flex flex-col gap-4 items-center min-h-screen w-full bg-gray-100 py-4'>
      <h1 className='text-3xl font-bold'>Know the weather, anywhere.</h1>
      <div className='flex flex-col gap-4 mt-4'>
        <div className='inline-block w-full max-w-md mx-auto'>
          <Autocomplete
            inputValue={inputValue}
            updateInputValue={updateInputValue}
            suggestions={suggestions}
            handleInputChange={handleInputChange}
            label='Enter city name'
          />
        </div>
        <div className='py-2 mx-auto'>
          <Button label='View Weather' onClick={() => fetchWeather()}/>
        </div>
        <div className='py-2 mx-auto'>
          {weatherData && (
            <div className='bg-white p-4 rounded shadow-md'>
              <h2 className='text-xl font-semibold'>{weatherData.city}</h2>
              <p>Temperature: {weatherData.temperatureCelsius}°C / {weatherData.temperatureFahrenheit}°F</p>
              <p>Condition: {weatherData.condition}</p>
              <p>Humidity: {weatherData.humidity}%</p>
              <p>Wind Speed: {weatherData.windSpeedKph} kph / {weatherData.windSpeedMph} mph</p>
              <p>Feels Like: {weatherData.feelsLikeCelsius}°C / {weatherData.feelsLikeFahrenheit}°F</p>
              <p>Local Time: {weatherData.localTime}</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default App;
