import React, { useState, useEffect } from "react";
import AuthUserContext from "./context";
import { withFirebase } from "../Firebase";

export default function withAuth(Component) {
  return withFirebase(function AuthenticatedComponent(props) {
    const { authUser, setAuthUser } = useState(null);

    useEffect(() => {
      props.firebase.auth.onAuthStateChanged(
        authUser => (authUser ? setAuthUser(authUser) : setAuthUser(null))
      );
    });

    return (
      <AuthUserContext.Provider value={authUser}>
        <Component {...props} />
      </AuthUserContext.Provider>
    );
  });
}

export const useAuth = Component => props => (
  <AuthUserContext.Consumer>
    {authUser => <Component {...props} authUser={authUser} />}
  </AuthUserContext.Consumer>
);
