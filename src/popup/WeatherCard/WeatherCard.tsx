import React, { useEffect, useState } from 'react'
import { Box, Card, CardContent, Typography } from '@material-ui/core'
import { fetchOpenWeatherData, OpenWeatherData } from '../../utils/api'

const WeatherCardContainer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <Box mx={'4px'} my={'16px'}>
      <Card>
        <CardContent> {children} </CardContent>
      </Card>
    </Box>
  )
}

type WeatherCardState = 'loading' | 'error' | 'ready'

const WeatherCard: React.FC<{ city: string }> = ({ city }) => {
  const [weatherData, setWeatherData] = useState<OpenWeatherData | null>(null)
  const [cardState, setCardState] = useState<WeatherCardState>('loading')

  useEffect(() => {
    fetchOpenWeatherData(city)
      .then((data) => {
        console.log(data)
        setWeatherData(data)
        setCardState('ready')
      })
      .catch((err) => {
        setCardState('error')
        console.log(err)
      })
  }, [city])
  if (cardState == 'loading' || cardState == 'error') {
    return (
      <WeatherCardContainer>
        <Typography variant='body1'>
          {cardState == 'loading'
            ? 'Loading...'
            : 'Could not retrieve wather data for this city'}
        </Typography>
      </WeatherCardContainer>
    )
  }
  return (
    <WeatherCardContainer>
      <Typography variant='h5'>{weatherData.name}</Typography>
      <Typography variant='body1'>
        Temperature: {Math.round(weatherData.main.temp)} °C
      </Typography>
      <Typography variant='body1'>
        Humidity: {Math.round(weatherData.main.humidity)}%
      </Typography>
      <Typography variant='body1'>
        Temperature Feels Like: {Math.round(weatherData.main.feels_like)} °C
      </Typography>
    </WeatherCardContainer>
  )
}

export default WeatherCard
