import { useEffect } from 'react';
import {
  Alignment,
  Fit,
  Layout,
  useRive,
  useViewModel,
  useViewModelInstance,
  useViewModelInstanceEnum,
} from '@rive-app/react-webgl2';

import weatherStatesRive from '../assets/weatherstates.riv';
import type { WeatherStateType } from '../types';

export const useRiveAnimation = (weatherState: WeatherStateType) => {
  const { rive, RiveComponent } = useRive({
    src: weatherStatesRive,
    autoplay: true,
    autoBind: true,
    artboard: 'WeatherBoard',
    stateMachines: 'main',
    layout: new Layout({
      fit: Fit.Contain,
      alignment: Alignment.Center,
    }),
  });

  const viewModel = useViewModel(rive, { name: 'WeatherViewModel' });
  const vmi = useViewModelInstance(viewModel, { rive });
  const enumInput = useViewModelInstanceEnum('weatherState', vmi);

  useEffect(() => {
    if (!rive || !vmi || !enumInput) return;

    if (enumInput.value !== weatherState) {
      enumInput.setValue(weatherState);
    }
  }, [enumInput, vmi, weatherState]);

  return RiveComponent;
};
