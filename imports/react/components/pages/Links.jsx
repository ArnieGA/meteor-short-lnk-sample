import React from 'react';
import PropTypes from 'react-prop-types';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { LinksDb } from '/imports/api/links';
import LinksList from '/imports/react/components/app-specific/LinksList';

class Links extends React.Component {
    constructor(props){
        super(props);
        this.onLogout = this.onLogout.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onLogout(e){
        e.preventDefault();
        Accounts.logout();
    }
    onSubmit(e){
        e.preventDefault();
        const url = this.refs.url.value.trim();
        if(!!url){
            Meteor.call('links.insert', url);
            this.refs.url.value = '';
        }
    }
    render(){
        return (
            <div>
                <h1>Hello from the Links page</h1>
                <button onClick={this.onLogout}>Logout</button>
                <LinksList />
                <p>Add Link</p>
                <form onSubmit={this.onSubmit}>
                    <input type="text" ref="url" placeholder="URL"/>
                    <button>Add Link</button>
                </form>
            </div>
        );
    }
}

export default Links;