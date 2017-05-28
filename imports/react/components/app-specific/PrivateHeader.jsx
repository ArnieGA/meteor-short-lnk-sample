import React from 'react';
import PropTypes from 'prop-types';
import { Accounts } from 'meteor/accounts-base';

export default class PrivateHeader extends React.Component {
    constructor(props){
        super(props);
        this.onLogout = this.onLogout.bind(this);
    }
    onLogout(e){
        e.preventDefault();
        Accounts.logout();
    }
    render(){
        return (
            <div>
                <h1>{this.props.title}</h1>
                <button onClick={this.onLogout}>Logout</button>
            </div>
        );
    }
}

PrivateHeader.propTypes = {
    title: PropTypes.string.isRequired
};