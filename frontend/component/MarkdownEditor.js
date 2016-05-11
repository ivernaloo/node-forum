import React from 'react';
import Codemirror from 'react-codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/markdown/markdown';

import './lib/style.css';

export default class MarkdownEditor extends React.Component {
  render() {
    return (
        <Codemirror options={{
          mode: 'gfm',
          lineNumbers: true,
          theme: 'default'

        }} />
    )
  }
}
