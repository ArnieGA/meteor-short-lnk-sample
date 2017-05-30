import React from 'react';
import { Meteor } from 'meteor/meteor';

export default class AddLink extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            typedUrl: ''
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onTypedUrlChange = this.onTypedUrlChange.bind(this);     
    }
    onSubmit(e){
        e.preventDefault();
        const host = this.state.typedUrl;
        if(!!host){
            const selectedIndex = this.refs.protocols.options.selectedIndex;
            const selectedProtocol = this.refs.protocols.options[selectedIndex].text;
            Meteor.call('links.insert', selectedProtocol, host, (err, response)=>{
                if(!err) { this.setState({typedUrl: ''}); }
                else { this.refs.host.select(); }
            });
        }
    }
    onTypedUrlChange(e){
        this.setState({typedUrl: e.target.value.trim()});
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
                    <input type="text" ref="host" placeholder="URL host (address)" 
                        value={this.state.typedUrl}
                        onChange={this.onTypedUrlChange} />
                    <button>Add Link</button>
                </form>
            </div>
        );
    }
}