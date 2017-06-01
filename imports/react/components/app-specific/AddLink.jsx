import { Meteor } from 'meteor/meteor';
import React from 'react';
import Modal from 'react-modal';
import uuid from 'node-uuid';

const protocolOptions = ['http', 'https', 'ftp'];

export default class AddLink extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            typedUrl: '',
            openModal: false,
            error: '',
            selectedProtocol: protocolOptions[0]
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onTypedUrlChange = this.onTypedUrlChange.bind(this);
        this.onProtocolChange = this.onProtocolChange.bind(this);
        this.resetModal = this.resetModal.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    onSubmit(e) {
        e.preventDefault();
        const host = this.state.typedUrl;
        if (!!host) {
            Meteor.call('links.insert', `${this.state.selectedProtocol}://`, host, (err, response) => {
                if (!err) {
                    this.setState({ openModal: false });
                    this.resetModal();
                }
                else {
                    this.setState({error: err.reason});
                    this.refs.host.select();
                }
            });
        }
        else {
            this.setState({error: 'Please enter a valid URL to continue.'});
            this.refs.host.focus();
        }
    }
    onTypedUrlChange(e) {
        this.setState({ typedUrl: e.target.value.trim() });
    }
    onProtocolChange(e){
        this.setState({selectedProtocol: this.refs.protocols.value});
    }
    renderProtocolOptions() {
        return protocolOptions.map((protocol) => {
            return <option key={`protocol_${uuid()}`} value={protocol}>{`${protocol}://`}</option>
        });
    }
    // MODAL FUNCTIONS:
    openModal(){
        this.setState({openModal:true});
    }
    closeModal(){
        this.setState({typedUrl: '', error: '', openModal: false});
    }
    resetModal(){
        this.setState({typedUrl:'', error: ''});
    }
    render() {
        return (
            <section>
                <button className='button' onClick={this.openModal}>+ Add Link</button>
                <Modal isOpen={this.state.openModal} 
                    contentLabel='Add link' 
                    className='boxed-view__box wider-box'
                    overlayClassName='boxed-view boxed-view--modal'
                    onAfterOpen={()=>this.refs.host.focus()} 
                    onRequestClose={this.closeModal}>
                    <h1>AddLink</h1>
                    {!!this.state.error ? <p className="boxed-view__error">{this.state.error}</p> : undefined}
                    <form className='boxed-view__form' onSubmit={this.onSubmit}>
                        <div className='boxed-view__child-container'>
                            <select ref='protocols' name='protocols' className='protocol-select' 
                                onChange={this.onProtocolChange}
                                value={this.state.selectedProtocol} >
                                {this.renderProtocolOptions()}
                            </select>
                            <input type="text" ref="host" placeholder="URL host"
                                value={this.state.typedUrl}
                                onChange={this.onTypedUrlChange}
                                style={{width: '75%'}} />
                        </div>
                        <button className='button'>Add Link</button>
                        <button type='button' className='button button--secondary' onClick={this.closeModal}>Cancel</button>
                    </form>
                </Modal>
            </section>
        );
    }
}