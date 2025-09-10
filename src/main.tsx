import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'           // Tailwind directives
import App from './App'
import { StyledEngineProvider } from '@mui/material/styles'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

const theme = createTheme({
  typography: {
    fontFamily: "Montserrat, sans-serif",
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </StyledEngineProvider>
  </React.StrictMode>
)
