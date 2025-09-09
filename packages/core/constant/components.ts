export const components = {
  weather: [
    'WeatherWidget',
  ] as const,
}

export const utilities = {
  utilities: [
    'useEmitAsProps',
    'useFilter',
    'useForwardProps',
    'useForwardPropsEmits',
    'useForwardExpose',
    'useId',
    'useStateMachine',
    'useBodyScrollLock',
    'useDateFormatter',
    'withDefault',
    'createContext',
  ] as const,
}

export type Components = typeof components
