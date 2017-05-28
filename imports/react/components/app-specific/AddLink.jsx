import React from 'react';
import { Meteor } from 'meteor/meteor';

export default class AddLink extends React.Component {
    constructor(props){
        super(props);
        this.onSubmit = this.onSubmit.bind(this);        
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
        return(
            <div>
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