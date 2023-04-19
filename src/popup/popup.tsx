import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import 'fontsource-roboto'
import './popup.css'
import WeatherCard from '../components/WeatherCard/WeatherCard'
import {
  Box,
  Grid,
  InputBase,
  IconButton,
  Paper,
  Typography,
} from '@material-ui/core'
import {
  Add as AddIcon,
  PictureInPicture as PictureInPictureIcon,
} from '@material-ui/icons'
import {
  setStoredCities,
  getStoredCities,
  setStoredOptions,
  getStoredOptions,
  LocalStorageOptions,
} from '../utils/storage'
import { Messages } from '../utils/messages'

const App: React.FC<{}> = () => {
  const [cities, setCities] = useState<string[]>([])
  const [cityInput, setCityInput] = useState<string>('')
  const [options, setOptions] = useState<LocalStorageOptions | null>(null)

  useEffect(() => {
    getStoredCities().then((cities) => setCities(cities))
    getStoredOptions().then((options: LocalStorageOptions) =>
      setOptions(options)
    )
  }, [])

  const handleCityAdd = () => {
    if (cityInput === '') return
    const updatedCities = [...cities, cityInput]
    setStoredCities(updatedCities).then(() => {
      setCities(updatedCities)
      setCityInput('')
    })
  }

  const handleCityDelete = (index: number) => {
    cities.splice(index, 1)
    const updatedCities = [...cities]
    setStoredCities(updatedCities).then(() => {
      setCities(updatedCities)
    })
  }

  const handleTempScale = () => {
    const updateOptions: LocalStorageOptions = {
      ...options,
      tempScale: options.tempScale === 'metric' ? 'imperial' : 'metric',
    }
    setStoredOptions(updateOptions).then(() => {
      setOptions(updateOptions)
    })
  }

  const handleOverlayToggle = () => {
    chrome.tabs.query(
      {
        active: true,
      },
      (tabs) => {
        if (tabs.length > 0) {
          chrome.tabs.sendMessage(tabs[0].id, Messages.TOGGLE_OVERLAY)
        }
      }
    )
  }

  if (!options) return null

  console.log(cityInput)
  return (
    <Box mx={'8px'} my={'16px'}>
      <Grid container justify='space-evenly'>
        <Grid item>
          <Paper>
            <Box px={'15px'} py={'5px'}>
              <InputBase
                placeholder='Add a city'
                value={cityInput}
                onChange={(event) => {
                  setCityInput(event.target.value)
                }}
              />
              <IconButton onClick={handleCityAdd}>
                <AddIcon />
              </IconButton>
            </Box>
          </Paper>
        </Grid>
        <Grid item>
          <Box py={'4px'}>
            <Paper>
              <IconButton onClick={handleTempScale}>
                {options.tempScale === 'metric' ? '\u2103' : '\u2109'}
              </IconButton>
            </Paper>
          </Box>
        </Grid>
        <Grid item>
          <Paper>
            <Box py='4px'>
              <IconButton onClick={handleOverlayToggle}>
                <PictureInPictureIcon />
              </IconButton>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      {options.homeCity != '' && (
        <WeatherCard city={options.homeCity} tempScale={options.tempScale} />
      )}
      {cities.map((city, index) => (
        <WeatherCard
          city={city}
          tempScale={options.tempScale}
          key={index}
          onDelete={() => {
            handleCityDelete(index)
          }}
        />
      ))}
      <Box height={'16px'} />
    </Box>
  )
}

const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.render(<App />, root)
