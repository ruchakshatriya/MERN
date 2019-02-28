import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
//import LoginComponent from './components/LoginComponent';
//import CreateUserComponent from './components/CreateUserComponent';
//import AddPersonInfoComponent from './components/AddPersonInfoComponent';
import App from './App';



ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
