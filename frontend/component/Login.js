import React from 'react';
import jQuery from 'jquery';

export default class Login extends React.Component {


    render() {
        return (
            <div style={{width: 400, margin: 'auto'}}>
                <div className="panel panel-primary">
                    <div className="panel-heading">登录</div>
                    <div className="panel-body">
                        <form>
                            <div className="form-group">
                                <label htmlFor="ipt-name">用户名</label>
                                <input type="text" className="form-control" id="ipt-name"  placeholder="" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">密码</label>
                                <input type="password" className="form-control" id="password"  placeholder="" />
                            </div>
                            <button type="button" className="btn btn-primary" >登录</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
