import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session'; //<-- meteor add session
import { Tracker } from 'meteor/tracker';
import { LinksDb } from '/imports/api/links';
import LinkItem from '/imports/react/components/app-specific/LinkItem';
import FlipMove from 'react-flip-move';

export default class LinksList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            links: []
        };
        this.renderLinksListItems = this.renderLinksListItems.bind(this);
    }
    componentDidMount() {
        // Start the links tracker
        this.linksTracker = Tracker.autorun(() => {
            Meteor.subscribe('links');
            const dbLinks = LinksDb.find({ visible: !Session.get('showHidden') }).fetch();
            this.setState({ links: dbLinks });
        });
    }
    componentWillUnmount() {
        this.linksTracker.stop();
    }
    renderLinksListItems() {
        if (this.state.links.length === 0) {
            return (
                <div className="item">
                    <p className='item__status-message'>No links found :-(</p>
                </div>

            );
            ;
        } else {
            return this.state.links.map((link) => {
                return <LinkItem key={link._id} shortUrl={Meteor.absoluteUrl(link._id)} {...link} />
            });
        }
    }
    render() {
        return (
            <section>
                <FlipMove maintainContainerHeight={true}>
                    {this.renderLinksListItems()}
                </FlipMove>
            </section>
        );
    }
}
