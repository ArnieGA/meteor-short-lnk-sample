import React from 'react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            invalidAttempts: 0
        };
        this.validatePassword = this.validatePassword.bind(this);
        this.clearFields = this.clearFields.bind(this);
    }
    onSubmit(e) {
        e.preventDefault();
        let email = this.refs.email.value.trim();
        let password = this.refs.password.value.trim();
        if (!!email && !!password) {
            if (!this.validatePassword(password)) {
                this.setState({ error: 'Invalid password. Passwords must be 6-8 characters long and include at least one Uppercase letter, one Lowercase letter, one digit and one special character.' });
                this.refs.password.focus();
                this.clearFields(['password']);
                return;
            } else { this.setState({ error: '' }); }

            Meteor.loginWithPassword({ email }, password, (err) => {
                if (err) {
                    switch (err.error) {
                        case 400:
                            this.setState({
                                error: 'Login attempt failed. You supplied incorrect credentials.',
                                invalidAttempts: this.state.invalidAttempts++
                            });
                            break;
                        default:
                            this.setState({ error: err.reason });
                            break;
                    }
                    this.refs.email.focus();
                    this.clearFields();
                } else {
                    this.setState({ error: '', invalidAttempts: 0 });
                }
            });
        } else {
            this.setState({ error: 'Please enter your credentials to continue.' });
            this.clearFields();
            this.refs.email.focus();
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
        } else {
            arrRefNames.forEach((refName) => {
                this.refs[refName].value = '';
            });
        }
    }
    render() {
        return (
            <div className='boxed-view'>
                <div className='boxed-view__box'>
                    <h1>Short Lnk</h1>
                    {this.state.error ? <p>{this.state.error}</p> : undefined}
                    <form className='boxed-view__form' onSubmit={this.onSubmit.bind(this)} noValidate>
                        <input type="email" ref="email" name="email" placeholder="Email" />
                        <input type="password" ref="password" name="password" placeholder="Password" />
                        <button className='button'>Login</button>
                    </form>
                    <p>Click <Link to="/signup">here</Link> to register</p>
                </div>
            </div>
        );
    }
}
export default Login;