import 'bootstrap-webpack';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import {getTopicList} from './lib/client';

console.log("right way");

ReactDOM.render(<App />, document.body);