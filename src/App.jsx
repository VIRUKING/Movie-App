import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  TextField,
  Container,
  Switch,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { AppProvider, useAppContext } from "./context/AppContext"; // Import the AppContext

import HomePage from "./components/HomePage";
import DataGridDemo from "./components/DataGridDemo";

function App() {
  return (
    <AppProvider>
     
      <AppWithContext />
    </AppProvider>
  );
}

function AppWithContext() {
  const { searchQuery, setSearchQuery, darkMode, toggleDarkMode } =
    useAppContext();

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AppBar position="static" color={darkMode ? "primary" : "secondary"}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Movie App
            </Typography>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Search..."
              sx={{ backgroundColor: "white", borderRadius: 1, mr: 2 }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/edit">
              Edit
            </Button>
            <Switch checked={darkMode} onChange={toggleDarkMode} />
          </Toolbar>
        </AppBar>
        <Container sx={{ mt: 3 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/edit"
              element={searchQuery ? <Navigate to="/" /> : <DataGridDemo />}
            />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;
