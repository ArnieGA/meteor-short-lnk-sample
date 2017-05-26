import {Meteor} from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import App from '/imports/App';


Meteor.startup(() => {
  ReactDOM.render(
    <App />,
    document.getElementById('app'));
});