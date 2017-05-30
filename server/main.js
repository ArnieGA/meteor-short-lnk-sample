import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';
import '/imports/startup/simple-schema-config';
import '/imports/api/users';
import { LinksDb } from '/imports/api/links';

Meteor.startup(() => {
  // code to run on server at startup
  WebApp.connectHandlers.use((req, res, next)=>{
    const link = LinksDb.findOne({_id: req.url.slice(1)});
    if(link){
      res.statusCode = 302;
      res.setHeader('location', link.url);
      res.end();
      Meteor.call('links.trackVisit', link._id);
    } else {
      next()
    }
  });
});
