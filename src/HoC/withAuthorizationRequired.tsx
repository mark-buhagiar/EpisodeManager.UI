import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import useIsAuthorizedFor from '../hooks/useIsAuthorizedFor';

const withAuthorizationRequired = <P extends object>(
    WrappedComponent: React.ComponentType<P>,
    requiredPermissions: string[],
): React.FunctionComponent<P> => (props: P): JSX.Element => {
    const { isAuthorized, loading } = useIsAuthorizedFor(...requiredPermissions);

    const homepage = <Redirect to="/" />;
    const authorized = <WrappedComponent {...props} />;
    return loading ? <></> : isAuthorized ? authorized : homepage;
};

export default withAuthorizationRequired;
