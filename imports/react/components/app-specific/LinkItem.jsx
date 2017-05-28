import React from 'react';
import PropTypes from 'prop-types';

export default class LinkItem extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <p>{this.props.url}</p>
                <p>{this.props.shortUrl}</p>
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