import React from 'react'
import MainRouter from './MainRouter'
import {BrowserRouter} from 'react-router-dom'
import { hot } from 'react-hot-loader'
import {MuiThemeProvider , createTheme} from '@material-ui/core/styles'
import {indigo, pink} from '@material-ui/core/colors'

const theme = createTheme({
    palette: {
      primary: {
      light: '#757de8',
      main: '#ffffff00',
      dark: '#002984',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff79b0',
      main: '#ff4081',
      dark: '#c60055',
      contrastText: '#000',
    },
      openTitle: indigo['400'],
      protectedTitle: pink['400'],
      type: 'light'
    }
  })

const App = () => (

    <BrowserRouter>
        <MuiThemeProvider theme={theme}>
            <MainRouter/>
        </MuiThemeProvider>
    </BrowserRouter>
  )
  
  export default hot(module)(App)