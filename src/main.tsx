import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'           // Tailwind directives
import App from './App'
import { StyledEngineProvider } from '@mui/material/styles'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import muiTheme from './theme/muiTheme'
import ScrollProvider from './providers/ScrollProvider'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        <ScrollProvider>
          <App />
        </ScrollProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  </React.StrictMode>
)
