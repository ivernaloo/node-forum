import React from 'react';
import 'highlight.js/styles/github-gist.css';
import {Link} from 'react-router';
import {getTopicDetail, addComment, deleteComment, deleteTopic} from './lib/client';
import {renderMarkdown, redirectURL} from './lib/utils';
import CommentEditor from './CommentEditor';

export default class TopicDetail extends React.Component {

    constructor(props){
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.refresh();
    }

    refresh() {
        getTopicDetail(this.props.params.id)
            .then(topic => {
                topic.html = renderMarkdown(topic.content);
                if (topic.comments) {
                    for (const item of topic.comments) {
                        item.html = renderMarkdown(item.content);
                    }
                }
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
                <p>{topic.authorId} 发表于 {topic.createdAt}</p>
                <p>标签：{topic.tags.join(', ')}</p>
                <Link to={`/topic/${topic._id}/edit`} className="btn btn-xs btn-primary">
                    <i className="glyphicon glyphicon-edit"></i> 编辑
                </Link>
                <hr/>
                <section dangerouslySetInnerHTML={{__html: topic.html}}></section>
                <ul className="list-group">
                    {topic.comments.map((item, i) => {
                        return (
                            <li className="list-group-item" key={i}>
                                {item._id}于{item.createdAt}说: <br/>{item.content}
                            </li>
                        )
                    })}
                </ul>

                <CommentEditor
                    title="发表评论"
                    onSave={(comment, done) => {
                        addComment(this.state.topic._id, comment.content)
                            .then(comment => {
                                done();
                                this.refresh();
                            })
                            .catch(err => {
                                done();
                                alert(err);
                            })
                    }}
                />

            </div>
        )

    }
}