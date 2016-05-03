import React from 'react';
import {Router, Route, Link, browserHistory} from 'react-router'
import Header from './component/Header';
import Footer from './component/Footer';
import TopicDetail from './component/TopicDetail';
import TopicList from './component/TopicList';

export default class App extends React.Component {
    render() {
        return (
            <div>
                <Header/>
                <Router history={browserHistory}>
                    <Route path="/" component={TopicList}/>
                    <Route path="/topic/:id" component={TopicDetail}/>
                </Router>

                <Footer/>
            </div>
        );
    }
}