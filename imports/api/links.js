import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
export const LinksDb = new Mongo.Collection('links');

// Extending SimpleSchema.RegEx with my own regexes:
// SimpleSchema.RegEx.UrlHost = new RegExp(/^((\w+\.)+([a-z]{3,5}))|((\d{1,3}\.){3}\d{1,3}(\:([0-9]|[1-8][0-9]|9[0-9]|[1-8][0-9]{2}|9[0-8][0-9]|99[0-9]|[1-8][0-9]{3}|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-9]|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-6]))?)$/i);
// SimpleSchema.RegEx.UrlProtocol = new RegExp(/^(?:(?:https?|ftp)\:\/\/)$/i);
// SimpleSchema.RegEx.PortRange = new RegExp(/^([0-9]|[1-8][0-9]|9[0-9]|[1-8][0-9]{2}|9[0-8][0-9]|99[0-9]|[1-8][0-9]{3}|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-9]|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-6])$/);
SimpleSchema.RegEx.Url2 = new RegExp(/^((?:https?|ftp)\:\/\/)(((\w+\.)+([a-z]{3,5}))|((\d{1,3}\.){3}\d{1,3}(\:([0-9]|[1-8][0-9]|9[0-9]|[1-8][0-9]{2}|9[0-8][0-9]|99[0-9]|[1-8][0-9]{3}|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-9]|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-6]))?))$/i);
// Defining the urlSchema for later use
const urlSchema = new SimpleSchema({
    url: {
        type: String,
        label: 'The URL you entered',
        regEx: SimpleSchema.RegEx.Url2
    }
});
// If the Meteor autopublish package is still installed, every user
// will have live access to the database information.
// After removing the autopublish package, the following
// code makes sure that this api subscribes to the db
// publication in order for things to work (but now in a secure fashion):
// NOTE: ALTHOUGH THIS FILE RUNS ON BOTH CLIENT AND SERVER
// THE METEOR.PUBLISH METHOD IS ONLY AVAILABLE ON THE SERVER.
if(Meteor.isServer){
    // the name 'links' is just for naming because the
    // method requires a string name as first argument
    Meteor.publish('links', function(){
        return LinksDb.find({userId: this.userId});
    });
}

Meteor.methods({
    'links.insert'(protocol, host) {
        if (!this.userId) {
            throw new Meteor.error('auth-error');
        }
        // Perform the validation
        try {
            urlSchema.validate({ url: protocol + host });
        } catch (e) {
            // Validation falied, throw error
            throw new Meteor.Error(400, e.message);
        }
        // Validation passed, write to the db
        LinksDb.insert({
            url: protocol + host,
            userId: this.userId
        });
    }
});
