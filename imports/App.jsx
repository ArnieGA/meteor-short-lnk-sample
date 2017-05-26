import React from 'react';
import { Tracker } from 'meteor/tracker';
import Routes, {onAuthChange} from '/imports/routes/Router';


class App extends React.Component {
    componentDidMount(){
        // Start the auth tracker
        this.authTracker = Tracker.autorun(()=>{
            const isAuthenticated = !!Meteor.userId();
            onAuthChange(isAuthenticated);
        });
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