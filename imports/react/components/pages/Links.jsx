import React from 'react';
import LinksList from '/imports/react/components/app-specific/LinksList';
import PrivateHeader from '/imports/react/components/app-specific/PrivateHeader';
import AddLink from '/imports/react/components/app-specific/AddLink';

class Links extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div>
                <PrivateHeader title='Your Links'/>
                <LinksList />
                <AddLink />
            </div>
        );
    }
}

export default Links;