import React from 'react';
import PrivateHeader from '/imports/react/components/app-specific/PrivateHeader';
import LinksListFilters from '/imports/react/components/app-specific/LinksListFilters';
import LinksList from '/imports/react/components/app-specific/LinksList';
import AddLink from '/imports/react/components/app-specific/AddLink';

export default () => {
    return (
        <div>
            <PrivateHeader title='Your Links' />
            <LinksListFilters />
            <LinksList />
            <AddLink />
        </div>
    );
};