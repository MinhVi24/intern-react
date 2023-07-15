import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { BrowserRouter } from 'react-router-dom';

import store from './redux/store';
import { Provider } from 'react-redux';


ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
     
        <BrowserRouter>
          <App />
        </BrowserRouter>
    
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();