export interface WeatherApiResponse {
	temperatureCelsius: number;
	temperatureFahrenheit: number;
	condition: string;
	city: string;
	humidity: number;
	windSpeedKph: number;
	windSpeedMph: number;
	feelsLikeCelsius: number;
	feelsLikeFahrenheit: number;
	localTime: string;
};
