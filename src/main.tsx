import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { ApolloProvider } from '@apollo/client/react';

import './main.css';
import App from './App';
import { client } from '@/graphql';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>,
);
