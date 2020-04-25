import axios from 'axios';
import React, { useEffect } from 'react';
import EnvironmentConfig from '../config/environment';
import { useAuth0 } from '../helpers/reactAuth0Spa';

const withAuthHeaderInterceptor = <P extends object>(
    WrappedComponent: React.ComponentType<P>,
): React.FunctionComponent<P> => (props: P): JSX.Element => {
    const { getTokenSilently } = useAuth0();

    useEffect(() => {
        if (EnvironmentConfig.isMocking) return;
        const interceptor = axios.interceptors.request.use(
            async function (config) {
                const token = await getTokenSilently();

                config.headers = {
                    ...config.headers,
                    Authorization: `bearer ${token}`,
                };
                return config;
            },
            function (error) {
                // Do something with request error
                throw error;
            },
        );
        return (): void => axios.interceptors.request.eject(interceptor);
    }, [getTokenSilently]);

    return <WrappedComponent {...props} />;
};

export default withAuthHeaderInterceptor;
