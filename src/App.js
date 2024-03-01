import { RouterProvider } from 'react-router-dom';
import './App.css';
import router from './routes';
import { ThemeProvider } from '@emotion/react';
import theme from './styles/theme';
import { CssBaseline } from '@mui/material';
import store from './store';
import { Provider } from 'react-redux';

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </ThemeProvider>
    </>
  );
}

export default App;
