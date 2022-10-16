import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import Routes from './Routes';
import './globalStyles.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <div className='global-container'>
      <h1>Hell.O</h1>
      <Routes />
    </div>
  </React.StrictMode>
);
reportWebVitals();
