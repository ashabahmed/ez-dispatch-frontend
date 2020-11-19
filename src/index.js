import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './redux/rootReducer'
import App from './App';
import thunk from 'redux-thunk';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(

  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root'),

);






// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
