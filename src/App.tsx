import { useState } from 'react';
import './App.css';
import Autocomplete from './components/Autocomplete/Autocomplete';
import Button from './components/Button/Button';
import type { WeatherApiResponse } from './types';
import WeatherDetailsView from './components/WeatherDetailsView/WeatherDetailsView';

const WEATHER_API_URL = import.meta.env.VITE_WEATHER_API_URL;
const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

function App() {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [weatherData, setWeatherData] = useState<WeatherApiResponse | null>(null);

  const updateInputValue = (value: string) => {
    setInputValue(value);
  };

  const filterUniqueSuggestions = (suggestions: string[]) =>
    suggestions.filter(
      (suggestion: string, index: number) => suggestions.indexOf(suggestion) === index
    );

  const handleInputChange = async (searchStr: string) => {
    const response = await fetch(
      `${WEATHER_API_URL}search.json?key=${WEATHER_API_KEY}&q=${searchStr}`
    );
    const results = await response.json();
    const suggestions = filterUniqueSuggestions(
      results.map((result: { name: string }) => result.name)
    );
    setSuggestions(suggestions);
  };

  const fetchWeather = async () => {
    if (!inputValue) {
      setWeatherData(null);
      return;
    }
    const response = await fetch(
      `${WEATHER_API_URL}current.json?key=${WEATHER_API_KEY}&q=${inputValue}`
    );
    const weatherData = await response.json();

    setWeatherData({
      temperatureCelsius: weatherData.current.temp_c,
      temperatureFahrenheit: weatherData.current.temp_f,
      condition: weatherData.current.condition.text,
      conditionCode: weatherData.current.condition.code,
      city: weatherData.location.name,
      humidity: weatherData.current.humidity,
      windSpeedKph: weatherData.current.wind_kph,
      windSpeedMph: weatherData.current.wind_mph,
      feelsLikeCelsius: weatherData.current.feelslike_c,
      feelsLikeFahrenheit: weatherData.current.feelslike_f,
      localTime: weatherData.location.localtime,
    } as WeatherApiResponse);
  };

  return (
    <main className="flex flex-col gap-4 items-center min-h-screen w-full bg-gray-100 py-4">
      <h1 className="text-3xl font-bold">Know the weather, anywhere.</h1>
      <div className="flex flex-col gap-4 mt-4 items-center w-full">
        <div className="inline-block max-w-md mx-auto">
          <Autocomplete
            inputValue={inputValue}
            updateInputValue={updateInputValue}
            suggestions={suggestions}
            handleInputChange={handleInputChange}
            label="Enter city name"
          />
        </div>
        <div className="py-2 mx-auto">
          <Button label="View Weather" onClick={() => fetchWeather()} />
        </div>
        <div className="py-2 mx-auto">
          {weatherData && <WeatherDetailsView weatherData={weatherData} width={500} height={200} />}
        </div>
      </div>
    </main>
  );
}

export default App;
