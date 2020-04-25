import React from 'react';
import AuthConfig from '../config/authConfig';
import { useHistory } from 'react-router-dom';
import { Auth0Provider } from '../helpers/reactAuth0Spa';

export const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P>): React.FunctionComponent<P> => (
    props: P,
): JSX.Element => {
    const history = useHistory();

    const onRedirectCallback = (appState: any): void => {
        history.push(appState && appState.targetUrl ? appState.targetUrl : window.location.pathname);
    };

    return (
        <Auth0Provider
            domain={AuthConfig.domain}
            client_id={AuthConfig.clientId}
            audience={AuthConfig.audience}
            redirect_uri={window.location.origin}
            onRedirectCallback={onRedirectCallback}
            useRefreshTokens={true}
        >
            <WrappedComponent {...props} />
        </Auth0Provider>
    );
};
