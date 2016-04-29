import React from 'react';
import {getTopicList} from './lib/client';

export default class TopicList extends React.Component {

    // const state = {};

    componentDidMount() {
        getTopicList({})
            .then(ret => this.setState({list: ret.list}))
            .catch(err => console.error(err));
    }

    render() {
        const list = Array.isArray(this.state.list) ? this.state.list : [];
        return (
            <div>
                <ul class="list-group">
                    {list.map((item, i) => {
                        return (
                            <li class="list-group-item">Cras justo odio</li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}