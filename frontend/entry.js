import 'bootstrap-webpack';
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory} from 'react-router'
import App from './App';
import TopicDetail from './component/TopicDetail';
import Login from './component/Login';
import NewTopic from './component/NewTopic';


const e = document.createElement('div');
e.id = 'app';
document.body.appendChild(e);

// import {getTopicList} from './lib/client';


ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <Route path="topic/:id" component={TopicDetail}/>
            <Route path="login" component={Login}/>
            <Route path="new" component={NewTopic}/>
        </Route>
    </Router>
), e);