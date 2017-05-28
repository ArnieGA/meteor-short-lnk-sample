import React from 'react';
import PropTypes from 'prop-types';
import Clipboard from 'clipboard';//<-- not a react library.

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
    render(){
        return(
            <div>
                <p>{this.props.url}</p>
                <p>{this.props.shortUrl}</p>
                <button ref="copyButton" data-clipboard-text={this.props.shortUrl}>{this.state.copied ? 'Copied' : 'Copy'}</button>
            </div>
        );
    }
}

LinkItem.propTypes = {
    shortUrl: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired
};