import 'bootstrap-webpack';
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, Link, browserHistory} from 'react-router'
import App from './App';
import TopicDetail from './component/TopicDetail';

const e = document.createElement('div');
e.className = 'container';
document.body.appendChild(e);

// import {getTopicList} from './lib/client';

console.log("right way");

ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <Route path="/topic/:id" component={TopicDetail}/>
        </Route>
    </Router>   
), e);