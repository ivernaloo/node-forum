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
                if(topic.comments){
                    for (const item of topic.comments){
                        item.html = renderMarkdown(item.content)
                    }
                }
                if (topic.comments) {
                    for (const item of topic.comments) {
                        item.html = renderMarkdown(item.content);
                    }
                }
                this.setState({topic});
            })
            .catch(err => console.error(err));
    }

    // todo: 删除不成功
    handleDeleteComment(cid) {
        if (!confirm('是否删除评论?')) return;
        deleteComment(this.state.topic._id, cid)
            .then(comment => {
                this.refresh();
            })
            .catch(err =>{
                alert(err);
            })
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
                <p>{topic.author.nickname} 发表于 {topic.createdAt}</p>
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
                                <span className="pull-right">
                                    <button className="btn btn-xs btn-danger" onClick={this.handleDeleteComment.bind(this, item._id)}>
                                        <i className="glyphicon glyphicon-trash"></i>
                                    </button>
                                </span>
                                {item.author.nickname}于{item.createdAt}说: <br/>
                                <p dangerouslySetInnerHTML={{__html: item.html}}></p>
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