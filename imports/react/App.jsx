import React from 'react';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session'; //<-- meteor add session
import Routes, {onAuthChange} from '/imports/react/routes/Router';


class App extends React.Component {
    componentDidMount(){
        // Start the auth tracker
        this.authTracker = Tracker.autorun(()=>{
            const isAuthenticated = !!Meteor.userId();
            onAuthChange(isAuthenticated);
        });
        // Set default value for the showHidden state:
        Session.set('showHidden', false);
    }
    componentWillUnmount(){
        this.authTracker.stop();
    }
    render(){
        return(
            <Routes/>
        );
    }
}

export default App;