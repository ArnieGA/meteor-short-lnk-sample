import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import moment from 'moment';
import SimpleSchema, {urlSchema} from '/imports/startup/simple-schema-config';
import shortid from 'shortid';

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
    'links.insert'(protocol, host) {
        if (!this.userId) {
            throw new Meteor.Error('auth-error');
        }
        // Validate the URL (NOTE: refer to /imports/startup/simple-schema-config.js)
        urlSchema.validate({ url: protocol + host });
        // Validation passed...Now validate existing url:
        if(LinksDb.find({userId: this.userId, url: protocol + host}).fetch().length > 0) {
            throw new Meteor.Error(400, 'The URL you entered already exists. Please submit a new URL.');
        }
        // URL doesn't exist, add it:
        if(Meteor.isClient) console.clear(); // clear console on client.
        LinksDb.insert({
            _id: shortid.generate(),
            url: protocol + host,
            userId: this.userId,
            visible: true,
            visitedCount: 0,
            lastVisitedAt: null
        });
    },
    'links.setVisibility'(linkId, newVisibility){
        if(!this.userId) throw new Meteor.Error('auth-error');
        new SimpleSchema({
            _id: {type: String, min: 1},
            visible: {type: Boolean}
        }).validate({
            _id: linkId, visible: newVisibility
        });
        LinksDb.update(
            {userId: this.userId, _id: linkId}, 
            {$set:{visible: newVisibility}}
        );
    },
    'links.trackVisit'(_id){
        new SimpleSchema({
            _id: {type: String, min: 1}
        }).validate({_id});
        LinksDb.update({_id},{
            $set:{
                lastVisitedAt: moment().unix()
            },
            $inc: {
                visitedCount: 1
            }
        });
    },
    'links.remove'(_id){
        if(!this.userId) throw new Meteor.Error('auth-error');
        new SimpleSchema({
            _id: {type: String, min: 1}
        }).validate({_id});
        LinksDb.remove({userId: this.userId, _id});
    }
});
