import 'bootstrap-webpack';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';


const e = document.createElement('div');
e.className = 'container';
document.body.appendChild(e);

// import {getTopicList} from './lib/client';

console.log("right way");

ReactDOM.render(<App />, e);