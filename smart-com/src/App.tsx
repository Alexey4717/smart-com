import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
//import ruLocale from 'date-fns/locale/ru';
//import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
//import { ApolloProvider } from "@apollo/client";
//import client from './utils/apollo';
//import { initializeApp } from 'store/slices/app';
import { routes, renderRoutes } from './routing/routes';
import { AuthProvider } from './contexts/Auth';
import theme from './theme';

const App: FC = () => {

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
