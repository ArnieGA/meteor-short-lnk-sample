import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

export const LinksDb = new Mongo.Collection('links');

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
    'links.insert'(url){
        if(!this.userId){
            throw new Meteor.error('auth-error');
        }
        LinksDb.insert({
            url,
            userId: this.userId
        });
    }
});
