import React from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";
import { createNewApiUser } from "../resources";
import {
  LoginContainer,
  LoginAction,
  GoogleIcon,
} from "../styledComponents/HeaderItemThird";

class GoogleOAuth extends React.Component {
  loadGoogle = () => {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId: process.env.REACT_APP_GOOGLE_OAUTH,
          scope: "email",
          prompt: "select_account",
        })
        .then((response) => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  };

  componentDidMount() {
    window.gapi && this.loadGoogle();
    window.addEventListener("google-loaded", () => {
      this.loadGoogle();
    });
  }

  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      createNewApiUser(this.auth.currentUser.get());
      const userData = {
        userId: this.auth.currentUser.get().getId(),
        email: this.auth.currentUser.get().getBasicProfile().getEmail(),
      };
      this.props.signIn(userData);
    } else {
      this.props.signOut();
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <LoginContainer onClick={this.onSignOutClick}>
          <LoginAction>
            <GoogleIcon before="Logout" />
          </LoginAction>
        </LoginContainer>
      );
    } else {
      return (
        <LoginContainer onClick={this.onSignInClick}>
          <LoginAction>
            <GoogleIcon before="Login" />
          </LoginAction>
        </LoginContainer>
      );
    }
  }

  render() {
    return <> {this.renderAuthButton()}</>;
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleOAuth);
