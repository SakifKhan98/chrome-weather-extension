const OPEN_WEATHER_API_KEY = '9a2acab3a119ebe174d95faafff7e846'

export interface OpenWeatherData {
  name: string
  main: {
    feels_like: number
    humidity: number
    pressure: number
    temp: number
    temp_max: number
    temp_min: number
  }
  weather: {
    description: string
    icon: string
    id: number
    main: string
  }[]
  wind: {
    deg: number
    speed: number
  }
}

export const fetchOpenWeatherData = async (
  city: string
): Promise<OpenWeatherData> => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${OPEN_WEATHER_API_KEY}`
  )
  if (!response.ok) {
    throw new Error('City Not Found!')
  }
  const data: OpenWeatherData = await response.json()
  return data
}
