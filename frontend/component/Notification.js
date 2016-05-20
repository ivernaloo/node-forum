import React from 'react';
import jQuery from 'jquery';
import {Link} from 'react-router';

import {notificationList} from './lib/client';
import {redirectURL} from './lib/utils';

export default class Notification extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        notificationList()
            .then(ret => this.setState(ret))
            .catch(err => console.error(err));
    }

    handleChange(name, e) {
        this.setState({[name]: e.target.value});
    }

    handleSave(e) {
        const $btn = jQuery(e.target);
        $btn.button('loading');
        updateProfile(this.state.email, this.state.nickname, this.state.about)
            .then(ret => {
                $btn.button('reset');
                alert('修改成功！');
            })
            .catch(err => {
                $btn.button('reset');
                alert(err);
            });
    }

    render() {
        if (!Array.isArray(this.state.list)) {
            return (
                <p>正在加载...</p>
            )
        }
        const list = this.state.list.map(item => {
            const ret = {};
            if(item.type === 'topic_comment'){
                ret.link = `/topic/${item.data._id}`;
                ret.title = `${item.from.nickname}评论了你发布的主题`;
            } else {
                ret.link = null;
                ret.title = `系统消息`;
            }
            ret._id = item._id;
            ret.isRead = item.isRead;
            ret.readAt = item.readAt;
            ret.createdAt = item.createdAt;
            return ret;
        });
        return (
            <ul className="list-group">
                {list.map((item, key) => {
                    return (
                        <Link to={item.link} className="list-group-item" key={key}>
                            {item.title}
                            <span className="pull-right">时间： {item.createdAt}</span>
                        </Link>
                    )
                })}
            </ul>
        )
    }
}
