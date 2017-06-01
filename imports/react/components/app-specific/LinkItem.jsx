import React from 'react';
import PropTypes from 'prop-types';
import Clipboard from 'clipboard';//<-- not a react library.
import { Meteor } from 'meteor/meteor';
import moment from 'moment';

export default class LinkItem extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            copied: false
        };
    }
    componentDidMount(){
        this.clipboard = new Clipboard(this.refs.copyButton);
        this.clipboard.on('success', (e)=>{
            this.setState({copied: true});
            setTimeout(()=>this.setState({copied: false}),1000);
        })
        .on('error', (e)=>{
            console.log('failure :\'(', e);
        });
    }
    componentWillUnmount(){
        this.clipboard.destroy();
    }
    setVisibility(){
        Meteor.call('links.setVisibility', this.props._id, !this.props.visible)
    }
    removeLink(){
        if(confirm(`Do you really want to remove this link (${this.props.url})?`)){
            Meteor.call('links.remove', this.props._id);
        }
    }
    renderStats(){
        const visitedTimes = this.props.visitedCount;
        const { lastVisited } = this.props;
        const visitMessage = visitedTimes === 1 ? `Visited ${visitedTimes} time` : visitedTimes > 1 ? `Visited ${visitedTimes} times` : 'Not visited yet';
        let lastVisitedMessage = (typeof this.props.lastVisitedAt === 'number') ? ` - (Last visited ${moment.unix(this.props.lastVisitedAt).fromNow()})` : '';
        return <p className='item__message'>{`${visitMessage}${lastVisitedMessage}`}</p>
    }
    render(){
        return(
            <div className='item'>
                <h2>{this.props.url}</h2>
                <p className='item__message'>{this.props.shortUrl}</p>
                {this.renderStats()}
                <div className='item-buttons-container'>
                    <a className='button button--pill button--link' href={this.props.shortUrl} target='_blank'>Visit</a>
                    <button className='button button--pill' ref="copyButton" data-clipboard-text={this.props.shortUrl}>{this.state.copied ? 'Copied' : 'Copy'}</button>
                    <button className='button button--pill' ref="hideButton" onClick={this.setVisibility.bind(this)}>
                        {this.props.visible ? 'Hide' : 'Unhide'}
                    </button>
                    <button className='button button--pill' ref='removeButton' onClick={this.removeLink.bind(this)}>Remove</button>
                </div>
            </div>
        );
    }
}

LinkItem.propTypes = {
    shortUrl: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
    visitedCount: PropTypes.number.isRequired,
    lastVisitedAt: PropTypes.number
};