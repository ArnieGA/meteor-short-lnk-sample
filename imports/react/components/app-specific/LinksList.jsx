import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { LinksDb } from '/imports/api/links';

export default class LinksList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            links: []
        };
        this.renderLinksListItems = this.renderLinksListItems.bind(this);
    }
    componentDidMount(){
        // Start the links tracker
        this.linksTracker = Tracker.autorun(()=>{
            Meteor.subscribe('links');
            const dbLinks = LinksDb.find().fetch();
            this.setState({links: dbLinks});
        });
    }
    componentWillUnmount(){
        this.linksTracker.stop();
    }
    renderLinksListItems(){
        return this.state.links.map((link)=>{
            return <p key={link._id}>{link.url}</p>
        });
    }
    render(){
        return (
            <div>
                <p>Links List</p>
                <div>{this.renderLinksListItems()}</div>
            </div>
        );
    }
}
