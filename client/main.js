import {Meteor} from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import '/imports/startup/simple-schema-config'; // Run the Simple Schema configuration file 
import App from '/imports/react/App';

Meteor.startup(() => {
  ReactDOM.render(
    <App />,
    document.getElementById('app'));
});