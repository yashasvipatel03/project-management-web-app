import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';  //Optional performance measuring tool
// Used for speed metrics (not required for functionality)
// import { AuthProvider } from './context/AuthContext';
import { Provider } from 'react-redux'; 
import store from './store/store';   
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
// Finds <div id="root"></div> in public/index.html
// ✅ React renders everything inside this div
root.render(
  <React.StrictMode> {/* Helps find bugs in development👉 Does NOT affect production */}
<BrowserRouter>
    <Provider store={store}>
        <App />   {/* This is your entire application UI */}
      </Provider>
  </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

reportWebVitals();
// Starts performance tracking
// Safe to remove if not needed