import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import 'fontsource-roboto'
import './popup.css'
import WeatherCard from './WeatherCard/WeatherCard'
import { Box, Grid, InputBase, IconButton, Paper } from '@material-ui/core'
import { Add as AddIcon } from '@material-ui/icons'

const App: React.FC<{}> = () => {
  const [cities, setCities] = useState<string[]>(['dhaka', 'doha', 'Errorr'])
  const [cityInput, setCityInput] = useState<string>('')

  const handleCityAdd = () => {
    if (cityInput === '') return

    setCities([...cities, cityInput])
    setCityInput('')
  }

  const handleCityDelete = (index: number) => {
    cities.splice(index, 1)
    setCities([...cities])
  }

  console.log(cityInput)
  return (
    <Box mx={'8px'} my={'16px'}>
      <Grid container>
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
      </Grid>

      {cities.map((city, index) => (
        <WeatherCard
          city={city}
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
