import React from 'react';
import ReactDOM from 'react-dom';

console.log("right way");
class App extends React.Component {
    render() {
        return (
            <div>
                <h1>hello</h1>
            </div>
            );
    }
}

ReactDOM.render(<App />, document.body);