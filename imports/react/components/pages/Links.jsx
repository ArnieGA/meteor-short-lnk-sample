import React from 'react';
import LinksList from '/imports/react/components/app-specific/LinksList';
import PrivateHeader from '/imports/react/components/app-specific/PrivateHeader';
import AddLink from '/imports/react/components/app-specific/AddLink';

export default () => {
    return (
        <div>
            <PrivateHeader title='Your Links' />
            <LinksList />
            <AddLink />
        </div>
    );
};