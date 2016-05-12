import React from 'react';
import jQuery from 'jquery';
import {addTopic} from './lib/client';
import {redirectURL} from './lib/utils';
import MarkdownEditor from './MarkdownEditor';

export default class CommentEditor extends React.Component {

  constructor(props) {
    super(props);
    this.state = props.topic || {};
  }

  handleChange(name, e) {
    this.setState({[name]: e.target.value});
  }

  handleSubmit(e) {
    const $btn = jQuery(e.target);
    $btn.button('loading');
    this.props.onSave(this.state, () => {
      $btn.button('reset');
    });
  }

  // todo: 需要加上ctrl + enter的快捷键
  render() {
    return (
      <div className="panel panel-primary">
        <div className="panel-heading">{this.props.title}</div>
        <div className="panel-body">
          <form>
            <div className="form-group">
              <label htmlFor="ipt-content">内容</label>
              <MarkdownEditor value={this.state.content} onChange={this.handleChange.bind(this, 'content')} />
            </div>
            <button type="button" className="btn btn-primary" onClick={this.handleSubmit.bind(this)}>保存</button>
          </form>
        </div>
      </div>
    )
  }
}
