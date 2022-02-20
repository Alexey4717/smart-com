import { BrowserRouter as Router } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { routes, renderRoutes } from './routing/routes';
import { AuthProvider } from './contexts/Auth';
import theme from './theme';

const App = () => {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider
        dense
        maxSnack={3}
      >
        <Router>
          <AuthProvider>
            {renderRoutes(routes)}
          </AuthProvider>
        </Router>
      </SnackbarProvider>
    </ThemeProvider>
  )
};

export default App;
