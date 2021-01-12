import React, { Suspense } from 'react';
import { I18nextProvider } from 'react-i18next';
import { render } from 'react-dom';
import i18n from './i18next';
import App from './App';
import './App.global.css';

render(
  <Suspense fallback={<div>Loading ……</div>}>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </Suspense>,
  document.getElementById('root')
);
