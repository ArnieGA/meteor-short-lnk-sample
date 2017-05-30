import React from 'react';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session'; //<-- meteor add session

export default class LinksListFilters extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showHidden: false
        }
    }
    componentDidMount(){
        this.visibilityTracker = Tracker.autorun(()=>{
            this.setState({showHidden: Session.get('showHidden')});
        });
    }
    componentWillUnmount(){
        this.visibilityTracker.stop();
    }
    toggleHidden(e){
        Session.set('showHidden', e.target.checked);
    }
    render(){
        return(
            <div>
                <div>
                    <input id="chkShowHidden" type="checkbox" ref='showHidden' 
                        onChange={this.toggleHidden.bind(this)}
                        checked={this.state.showHidden} />
                    <label htmlFor="chkShowHidden">Show Hidden Links</label>
                </div>
            </div>
        );
    }
}