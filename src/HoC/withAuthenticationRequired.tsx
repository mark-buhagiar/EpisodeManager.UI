import React from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth0 } from '../helpers/reactAuth0Spa';
import LoadingIndicator from '../components/loading/Loading';

const withAuthenticationRequired = <P extends object>(
    WrappedComponent: React.ComponentType<P>,
): React.FunctionComponent<P> => (props: P): JSX.Element => {
    const { loading, isAuthenticated } = useAuth0();

    const loadingIndicator = <LoadingIndicator />;
    const loggedOut = <Redirect to="/landing" />;
    const loggedIn = <WrappedComponent {...props} />;
    return isAuthenticated ? loggedIn : loading ? loadingIndicator : loggedOut;
};

export default withAuthenticationRequired;
