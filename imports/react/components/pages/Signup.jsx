import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Tooltip from 'react-portal-tooltip';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      pwdTtipActive: false // <- maintains the password modal open/close state
    };
    this.validatePassword = this.validatePassword.bind(this);
    this.clearFields = this.clearFields.bind(this);
  }
  onSubmit(e) {
    e.preventDefault();
    this.setState({pwdTtipActive: false});
    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();
    let rePassword = this.refs.rePassword.value.trim();
    if (!!email && !!password && !!rePassword) {
      if (!this.validatePassword(password)) {
        this.setState({ error: 'Invalid password.' });
        this.refs.password.focus();
        this.clearFields(['password', 'rePassword']);
        return;
      }
      else if (password !== rePassword) {
        this.setState({ error: 'The passwords don\'t match. Please try again.' });
        this.clearFields(['password', 'rePassword']);
        this.refs.password.focus();
        return;
      }
      else {
        this.setState({ error: '' });
      }

      Accounts.createUser({ email, password }, (err) => {
        if (err) {
          this.setState({ error: err.reason });
          this.refs.email.value = '';
          this.refs.password.value = '';
          this.refs.email.focus();
        } else {
          this.setState({ error: '' });
        }
      });
    } else {
      this.setState({ error: 'All fields are required.' });
      if (!email) { this.refs.email.focus(); this.clearFields(); }
      else { this.refs.password.focus(); this.clearFields(['password', 'rePassword']); }
    }
  }
  validatePassword(password) {
    let pwdRegex = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{6,8}$/);
    if (pwdRegex.test(password)) return true;
    return false;
  }
  clearFields(arrRefNames = []) {
    if (arrRefNames.length === 0) {
      this.refs.email.value = '';
      this.refs.password.value = '';
      this.refs.rePassword.value = '';
    } else {
      arrRefNames.forEach((refName) => {
        this.refs[refName].value = '';
      });
    }
  }
  // TOOLTIP ACTIONS
  openPwdTtip(){
    this.setState({pwdTtipActive: true});
  }
  closePwdTtip(){
    this.setState({pwdTtipActive: false});
  }
  render() {
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Signup form</h1>
          {this.state.error ? <p className="boxed-view__error">{this.state.error}</p> : undefined}
          <form className='boxed-view__form' onSubmit={this.onSubmit.bind(this)} noValidate>
            <input type="email" ref="email" name="email" placeholder="Email" />
            <input id='passwrd' 
              onFocus={this.openPwdTtip.bind(this)}
              onBlur={this.closePwdTtip.bind(this)} 
                  type="password" 
              ref="password" 
              name="password" 
              placeholder="Password (6-8 characters)" />
            <Tooltip active={this.state.pwdTtipActive} position='right' arrow='center' parent='#passwrd'>
              <div className='tooltip__content'>
                <p>Must contain letters, digits and special characters (at least 1 of each)</p>
              </div>
            </Tooltip>
            <input type="password" ref="rePassword" name="rePassword" placeholder="Re-enter your password" />
            <button className='button'>Create Account</button>
          </form>
          <Link to="/">I already have an account...</Link>
        </div>
      </div>
    );
  }
}

export default Signup;