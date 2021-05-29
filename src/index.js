import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom'
import './index.css';
import App from './container/App';
import reportWebVitals from './reportWebVitals';
import { createMemoryHistory } from 'history'
import { Provider } from 'react-redux'
const history = createMemoryHistory()
import configureStore from './redux/configureStore'
const store  = configureStore()

ReactDOM.render(
  <Provider store={store}>
  <React.StrictMode>
    <HashRouter >
      <App history={history}/>
    </HashRouter>
  </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
