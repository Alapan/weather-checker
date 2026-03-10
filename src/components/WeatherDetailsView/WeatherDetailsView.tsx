import { useRiveAnimation } from '../../hooks/useRiveAnimation';
import type { WeatherApiResponse, WeatherStateType } from '../../types';
import { formatDateTime } from '../../utils';

interface WeatherDetailsViewProps {
  weatherData: WeatherApiResponse;
  width?: number;
  height?: number;
}

const WeatherDetailsView = ({
  weatherData,
  width = 400,
  height = 200,
}: WeatherDetailsViewProps) => {
  const {
    temperatureCelsius,
    condition,
    conditionCode,
    city,
    humidity,
    windSpeedMph,
    feelsLikeCelsius,
    localTime,
  } = weatherData;

  const mapWeatherCodeToRiveState = (): WeatherStateType => {
    switch (conditionCode) {
      case 1000:
        return 'SUN';
      case 1003:
        return 'PARTIALLY_CLOUDY';
      case 1006:
      case 1009:
        return 'CLOUDY';
      case 1030:
        return 'FOG';
      case 1063:
      case 1072:
      case 1150:
      case 1153:
      case 1168:
      case 1171:
      case 1180:
      case 1183:
      case 1186:
      case 1189:
      case 1192:
      case 1195:
      case 1198:
      case 1201:
      case 1240:
      case 1243:
      case 1246:
      case 1273:
        return 'RAIN';
      case 1066:
      case 1114:
      case 1117:
      case 1210:
      case 1213:
      case 1216:
      case 1219:
      case 1222:
      case 1225:
      case 1237:
      case 1249:
      case 1252:
      case 1255:
      case 1258:
      case 1261:
      case 1264:
      case 1279:
      case 1282:
      case 1204:
      case 1207:
        return 'SNOW';
      case 1087:
      case 1273:
      case 1276:
        return 'STORM';
      case 1135:
      case 1147:
        return 'FOG';
      default:
        return 'WIND';
    }
  };

  const RiveComponent = useRiveAnimation(mapWeatherCodeToRiveState());

  return (
    <div className="flex flex-col gap-4 items-center w-full bg-cyan-100 p-6 rounded-lg shadow-2xl">
      <h2 className="text-2xl font-bold">{city}</h2>
      <p className="text-md text-gray-600">{formatDateTime(localTime)}</p>
      <RiveComponent style={{ width, height }} />
      <p className="text-2xl font-semibold">{temperatureCelsius}°C</p>
      <p className="text-lg font-semibold">{condition}</p>
      <div className="flex flex-col gap-1 items-center w-full">
        <div className="text-md text-gray-600">Feels like: {feelsLikeCelsius}°C</div>
        <div className="text-sm text-gray-600">Humidity: {humidity}%</div>
        <div className="text-sm text-gray-600">Wind: {windSpeedMph} mph</div>
      </div>
    </div>
  );
};

export default WeatherDetailsView;
