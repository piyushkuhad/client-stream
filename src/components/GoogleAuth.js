import React, { Component } from 'react';
import { connect } from 'react-redux';
import {signIn, signOut} from '../actions';

import googleAuthId from '../apis/googleAuthId';

class GoogleAuth extends Component{

    //This state should be available globally
    // state = {
    //     isSignedIn: null
    // };

    componentDidMount(){
        window.gapi.load('client: auth2', ()=> {
            window.gapi.client.init({
                clientId: googleAuthId,
                scope: 'email'
            }).then(()=> {
                this.auth = window.gapi.auth2.getAuthInstance();
                //this.setState({isSignedIn: this.auth.isSignedIn.get()})
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange)
            })
        });
    }

    onAuthChange = (isSignedIn) => { 
        //this.setState({isSignedIn: this.auth.isSignedIn.get()}) //already receives a boolean in callback (isSignedIn)
        if(isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId());
        }
        else {
            this.props.signOut();
        }
    }

    onSignInClick = () => {
        this.auth.signIn();
    }

    onSignOutClick = () => {
        this.auth.signOut();
    }

    renderAuthButton() {
        if(this.props.isSignedIn === null) {
            return null;
        }
        else if(this.props.isSignedIn) {
            return(
                <button className="ui red google button" onClick={this.onSignOutClick}>
                    <i className="google icon"></i>Sign Out
                </button>
            )
        }
        else {
            return(
                <button className="ui red google button" onClick={this.onSignInClick}>
                    <i className="google icon"></i>Sign In with Google
                </button>
            )
        }
    }

    render(){
        //console.log(this.props);
        return(
            <div className="item">{this.renderAuthButton()}</div>
        )
    }
}

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn };
}

export default connect(mapStateToProps, {signIn, signOut})(GoogleAuth);