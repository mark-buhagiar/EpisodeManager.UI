import axios from 'axios';
import React, { useEffect } from 'react';
import EnvironmentConfig from '../config/environmentConfig';
import * as qs from 'qs';

const withRepeatingArrayParamsInterceptor = <P extends object>(
    WrappedComponent: React.ComponentType<P>,
): React.FunctionComponent<P> => (props: P): JSX.Element => {
    useEffect(() => {
        if (EnvironmentConfig.isMocking) return;
        const interceptor = axios.interceptors.request.use(
            async function (config) {
                config.paramsSerializer = function (params: any): string {
                    return qs.stringify(params, { arrayFormat: 'repeat' });
                };
                return config;
            },
            function (error) {
                // Do something with request error
                throw error;
            },
        );
        return (): void => axios.interceptors.request.eject(interceptor);
    }, []);

    return <WrappedComponent {...props} />;
};

export default withRepeatingArrayParamsInterceptor;
