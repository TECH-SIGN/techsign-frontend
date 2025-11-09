import { createTheme } from "@mui/material/styles";

// Keep MUI theme broadly aligned with Tailwind (slate/blue scale)
const muiTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#0f172a" }, // slate-900
    secondary: { main: "#1e293b" }, // slate-800
    background: {
      default: "#ffffff",
      paper: "#ffffff",
    },
    text: {
      primary: "#0f172a", // slate-900
      secondary: "#475569", // slate-600
    },
  },
  typography: {
    fontFamily:
      'var(--font-sans), ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica Neue, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
    h1: { fontWeight: 700, fontSize: "2rem" },
    h2: { fontWeight: 700, fontSize: "1.5rem" },
    h3: { fontWeight: 600, fontSize: "1.25rem" },
    body1: { fontSize: "1rem" },
    body2: { fontSize: "0.875rem" },
    button: { textTransform: "none", fontWeight: 600 },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

export default muiTheme;
