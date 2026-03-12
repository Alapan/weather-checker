export interface WeatherApiResponse {
  temperatureCelsius: number;
  condition: string;
  conditionCode: number;
  city: string;
  humidity: number;
  windSpeedMph: number;
  feelsLikeCelsius: number;
  localTime: string;
}

export type WeatherStateType =
  | 'RAIN'
  | 'SUN'
  | 'FOG'
  | 'STORM'
  | 'PARTIALLY_CLOUDY'
  | 'CLOUDY'
  | 'WIND'
  | 'SNOW';
