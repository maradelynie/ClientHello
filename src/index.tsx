import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import Routes from './Routes';
import './globalStyles.scss';
import { MatchProvider } from './hooks/useMatch';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <MatchProvider>
        <div className='global-container'>
          <Routes />
        </div>
      </MatchProvider>
  </React.StrictMode>
);
reportWebVitals();
