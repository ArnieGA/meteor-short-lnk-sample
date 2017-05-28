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
        const host = this.refs.host.value.trim();
        if(!!host){
            const selectedIndex = this.refs.protocols.options.selectedIndex;
            const selectedProtocol = this.refs.protocols.options[selectedIndex].text;
            Meteor.call('links.insert', selectedProtocol, host);
            this.refs.host.value = '';
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
                    <select name="protocols" ref="protocols">
                        <option value="http">http://</option>
                        <option value="https">https://</option>
                        <option value="ftp">ftp://</option>
                    </select>
                    <input type="text" ref="host" placeholder="URL host (address)"/>
                    <button>Add Link</button>
                </form>
            </div>
        );
    }
}

export default Links;