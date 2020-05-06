import axios, { AxiosError } from 'axios';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import BackendError from '../models/BackendError';

const withErrorResponseInterceptor = <P extends object>(
    WrappedComponent: React.ComponentType<P>,
): React.FunctionComponent<P> => (props: P): JSX.Element => {
    useEffect(() => {
        const interceptor = axios.interceptors.response.use(
            async function (response) {
                // If the response didn't have any errors, move along
                return response;
            },
            function (error: AxiosError<BackendError>) {
                toast.error(error.response?.data.detail ?? 'An unknown error has occurred');
                throw error;
            },
        );
        return (): void => axios.interceptors.request.eject(interceptor);
    }, []);

    return <WrappedComponent {...props} />;
};

export default withErrorResponseInterceptor;
