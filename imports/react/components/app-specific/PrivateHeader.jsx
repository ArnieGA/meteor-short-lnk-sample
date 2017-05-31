import React from 'react';
import PropTypes from 'prop-types';
import { Accounts } from 'meteor/accounts-base';

const PrivateHeader = (props) => {
    return (
        <div className='private-header'>
            <div className='private-header__container'>
                <h1 className='private-header__title'>{props.title}</h1>
                <button className="button button--header" onClick={()=>Accounts.logout()}>Logout</button>
            </div>
        </div>
    );
};

PrivateHeader.propTypes = {
    title: PropTypes.string.isRequired
};

export default PrivateHeader;