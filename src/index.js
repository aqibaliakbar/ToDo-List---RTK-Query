import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// we need to provide our slice to the app for that we need to provide couple of imports

import { apiSlice } from './features/api/apiSlice';
import { ApiProvider } from '@reduxjs/toolkit/dist/query/react'; // it is like the contextAPi // we will wrap the app with the provider.

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApiProvider api={apiSlice}>
      <App />
    </ApiProvider>
  </React.StrictMode>
);