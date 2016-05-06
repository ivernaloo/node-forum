import React from 'react';
import 'highlight.js/styles/github-gist.css';
import {getTopicDetail} from './lib/client';


export default class TopicDetail extends React.Component {

    constructor(props){
        super(props);
        this.state = {};
    }

    componentDidMount() {
        getTopicDetail(this.props.params.id)
            .then(topic => {
                this.setState({topic});
            })
            .catch(err => console.error(err));
    }

    render() {
        const topic = this.state.topic;
        if(!topic){
            return (
                <div>正在加载...</div>
            )
        }
        return (
            <div>
                <h2>{topic.title}</h2>
                <Link to={`/topic/${topic._id}/edit`} className="btn btn-xs btn-primary">
                    <i className="glyphicon glyphicon-edit"></i> 编辑
                </Link>
                <hr/>
                <section >{topic.content}</section>
                <ul className="list-group">
                    {topic.comments.map((item, i) => {
                        return (
                            <li className="list-group-item" key={i}>
                                {item._id}于{item.createdAt}说: <br/>{item.content}
                            </li>
                        )
                    })}
                </ul>
            </div>
        )

    }
}