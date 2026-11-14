import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App.jsx';
import './styles/base.css';
import './styles/home.css';
import './styles/lesson.css';
import './styles/reading.css';
import './styles/activities.css';

createRoot(document.getElementById('root')).render(
  <HashRouter><App /></HashRouter>
);
