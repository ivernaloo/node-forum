import React from 'react';

const footerStyle = {
    marginTop: 50,
    padding: 20,
};

export default class Footer extends React.Component {
    render() {
        return (
            <div className="text-center">
                &copy; CopyRight Node.js项目实战 hello world
            </div>
        )

    }
}