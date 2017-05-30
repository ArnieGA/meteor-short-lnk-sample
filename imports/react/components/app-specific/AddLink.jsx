import { Meteor } from 'meteor/meteor';
import React from 'react';
import Modal from 'react-modal';
import uuid from 'node-uuid';

const allowedProtocols = ['http', 'https', 'ftp'];

export default class AddLink extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            typedUrl: '',
            openModal: false
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onTypedUrlChange = this.onTypedUrlChange.bind(this);
    }
    onSubmit(e) {
        e.preventDefault();
        const host = this.state.typedUrl;
        if (!!host) {
            const selectedIndex = this.refs.protocols.options.selectedIndex;
            const selectedProtocol = this.refs.protocols.options[selectedIndex].text;
            Meteor.call('links.insert', selectedProtocol, host, (err, response) => {
                if (!err) {
                    this.setState({ typedUrl: '', openModal: false });
                }
                else {
                    this.refs.host.select();
                }
            });
        }
    }
    onTypedUrlChange(e) {
        this.setState({ typedUrl: e.target.value.trim() });
    }
    renderProtocolOptions() {
        return allowedProtocols.map((protocol) => {
            return <option key={`protocol_${uuid()}`} value={protocol}>{`${protocol}://`}</option>
        });
    }
    render() {
        return (
            <div>
                <button onClick={() => this.setState({ openModal: true })}>+ Add Link</button>
                <Modal isOpen={this.state.openModal} contentLabel='Add link'>
                    <p>Add Link</p>
                    <form onSubmit={this.onSubmit}>
                        <select name="protocols" ref="protocols">
                            {this.renderProtocolOptions()}
                        </select>
                        <input type="text" ref="host" placeholder="URL host (address)"
                            value={this.state.typedUrl}
                            onChange={this.onTypedUrlChange} />
                        <button>Add Link</button>
                    </form>
                    <button onClick={() => this.setState({ openModal: false, typedUrl: '' })}>Cancel</button>
                </Modal>
            </div>
        );
    }
}