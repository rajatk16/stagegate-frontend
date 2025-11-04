import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';
import { createRoot } from 'react-dom/client';
import { ApolloProvider } from '@apollo/client/react';
import { PersistGate } from 'redux-persist/integration/react';

import './main.css';
import App from './App';
import { client } from '@/graphql';
import { persistor, store } from '@/store';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </ApolloProvider>
  </React.StrictMode>,
);
