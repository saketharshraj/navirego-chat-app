import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/globals.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme'
import {SnackbarProvider} from "notistack";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <SnackbarProvider>
                <ThemeProvider theme={theme}>
                    <App />
                </ThemeProvider>
            </SnackbarProvider>
        </BrowserRouter>
    </React.StrictMode>
);

