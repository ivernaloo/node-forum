import 'bootstrap-webpack';
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory} from 'react-router'
import App from './App';
import TopicDetail from './component/TopicDetail';
import Login from './component/Login';
import Signup from './component/Signup';
import NewTopic from './component/NewTopic';
import EditTopic from './component/EditTopic';
import Profile from './component/Profile';


const e = document.createElement('div');
e.id = 'app';
document.body.appendChild(e);

// import {getTopicList} from './lib/client';


ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <Route path="topic/:id" component={TopicDetail}/>
            <Route path="topic/:id/edit" component={EditTopic}/>
            <Route path="login" component={Login}/>
            <Route path="new" component={NewTopic}/>
            <Route path="signup" component={Signup}/>
            <Route path="profile" component={Profile}/>
        </Route>
    </Router>
), e);