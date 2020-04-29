import { useEffect, useState } from 'react';
import { useAuth0 } from '../helpers/reactAuth0Spa';
import authConfig from '../config/authConfig';

type authorizationCheck = {
    isAuthorized: boolean;
    loading: boolean;
};

const useIsAuthorizedFor = (...requiredPermissions: string[]): authorizationCheck => {
    const { isAuthenticated, getIdTokenClaims } = useAuth0();
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function processIdToken(): Promise<void> {
            const userPermissions = (await getIdTokenClaims())[authConfig.permissionsClaim] as string[];
            let isAuthorized = true;
            requiredPermissions.forEach((requiredPermission) => {
                isAuthorized = isAuthorized && userPermissions.includes(requiredPermission);
            });

            setIsAuthorized(isAuthorized);
            setLoading(false);
        }

        if (!isAuthenticated) setLoading(false);
        else processIdToken();
    }, [isAuthenticated, getIdTokenClaims]);

    return { isAuthorized, loading };
};

export default useIsAuthorizedFor;
