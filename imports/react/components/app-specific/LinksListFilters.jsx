import React from 'react';
import { Session } from 'meteor/session'; //<-- meteor add session

export default class LinksListFilters extends React.Component{
    setVisibility(){
        Session.set('showHidden', this.refs.showHidden.checked);
    }
    render(){
        return(
            <div>
                <div>
                    <input id="chkShowHidden" type="checkbox" ref='showHidden' 
                        onChange={this.setVisibility.bind(this)} />
                    <label htmlFor="chkShowHidden">Show Hidden Links</label>
                </div>
            </div>
        );
    }
}