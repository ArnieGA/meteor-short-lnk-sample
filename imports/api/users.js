import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Accounts } from 'meteor/accounts-base';

export const userCredentialsSchema = new SimpleSchema({
  email: {
    type: String,
    regEx: SimpleSchema.RegEx.EmailWithTLD
  }
});

Accounts.validateNewUser((user)=>{
    const email = user.emails[0].address;
    try {
        userCredentialsSchema.validate({
            email
        });
    } catch(e){
        throw new Meteor.Error(400, e.message);
    }
    return true;
});
