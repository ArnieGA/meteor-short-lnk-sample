import React from 'react';
import PrivateHeader from '/imports/react/components/app-specific/PrivateHeader';
import LinksListFilters from '/imports/react/components/app-specific/LinksListFilters';
import AddLink from '/imports/react/components/app-specific/AddLink';
import LinksList from '/imports/react/components/app-specific/LinksList';

export default () => {
    return (
        <div>
            <PrivateHeader title='Short Lnk' />
            <div className='page-container'>
                <LinksListFilters />
                <AddLink />
                <LinksList />
            </div>
        </div>
    );
};