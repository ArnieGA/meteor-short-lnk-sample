import { Meteor } from 'meteor/meteor';
import {userCredentialsSchema} from '/imports/startup/simple-schema-config';
import { Accounts } from 'meteor/accounts-base';


Accounts.validateNewUser((user)=>{
    const email = user.emails[0].address;
    // Validate User credentials (NOTE: refer to /imports/startup/simple-schema-config.js)
    userCredentialsSchema.validate({
        email
    });
    return true;
});
