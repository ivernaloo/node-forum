import React from 'react';
import Header from './component/Header';
import Footer from './component/Footer';
import TopicDetail from './component/TopicDetail';
import TopicList from './component/TopicList';

export default class App extends React.Component {
    render() {
        return (
            <div>
                <Header/>
                <TopicDetail/>
                <Footer/>
            </div>
        );
    }
}