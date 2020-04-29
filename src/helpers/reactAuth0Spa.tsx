import createAuth0Client, { Auth0Client, IdToken } from '@auth0/auth0-spa-js';
import React, { useContext, useEffect, useState } from 'react';
import EnvironmentConfig from '../config/environment';
import { resolve } from 'dns';
import AuthConfig from '../config/authConfig';

// Modified by Mark
const DEFAULT_REDIRECT_CALLBACK = (): void => window.history.replaceState({}, document.title, window.location.pathname);

interface Auth0ContextWrapper {
    isAuthenticated: boolean;
    user: any;
    loading: boolean;
    popupOpen: boolean;
    loginWithPopup: (params?: any) => Promise<void>;
    handleRedirectCallback: () => Promise<void>;
    getIdTokenClaims: (...args: any[]) => Promise<IdToken>;
    loginWithRedirect: (...args: any[]) => Promise<void>;
    getTokenSilently: (...args: any[]) => Promise<any>;
    getTokenWithPopup: (...args: any[]) => Promise<string>;
    logout: (...args: any[]) => void;
}

export const Auth0Context = React.createContext<Auth0ContextWrapper>({} as Auth0ContextWrapper);
export const useAuth0 = (): Auth0ContextWrapper => useContext(Auth0Context);

export const Auth0Provider = ({
    children,
    onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
    ...initOptions
}: any): JSX.Element => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState();
    const [auth0Client, setAuth0] = useState<Auth0Client>({} as Auth0Client);
    const [loading, setLoading] = useState(true);
    const [popupOpen, setPopupOpen] = useState(false);

    useEffect(() => {
        if (EnvironmentConfig.isMocking) return;

        const initAuth0 = async (): Promise<void> => {
            const auth0FromHook = await createAuth0Client(initOptions);
            setAuth0(auth0FromHook);

            if (window.location.search.includes('code=') && window.location.search.includes('state=')) {
                const { appState } = await auth0FromHook.handleRedirectCallback();
                onRedirectCallback(appState);
            }

            const isAuthenticated = await auth0FromHook.isAuthenticated();

            setIsAuthenticated(isAuthenticated);

            if (isAuthenticated) {
                const user = await auth0FromHook.getUser();
                setUser(user);
            }

            setLoading(false);
        };
        initAuth0();
        // We only want this to run once, so an empty deps array is desired
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loginWithPopup = async (params = {}): Promise<void> => {
        debugger;
        setPopupOpen(true);
        try {
            await auth0Client.loginWithPopup(params);
        } catch (error) {
            console.error(error);
        } finally {
            setPopupOpen(false);
        }
        const user = await auth0Client.getUser();
        setUser(user);
        setIsAuthenticated(true);
    };

    const handleRedirectCallback = async (): Promise<void> => {
        setLoading(true);
        await auth0Client.handleRedirectCallback();
        const user = await auth0Client.getUser();
        setLoading(false);
        setIsAuthenticated(true);
        setUser(user);
    };

    const actualAuth0ContextProvider = (
        <Auth0Context.Provider
            value={{
                isAuthenticated,
                user,
                loading,
                popupOpen,
                loginWithPopup,
                handleRedirectCallback,
                getIdTokenClaims: (...p): Promise<IdToken> => auth0Client.getIdTokenClaims(...p),
                loginWithRedirect: (...p): Promise<void> => auth0Client.loginWithRedirect(...p),
                getTokenSilently: (...p): Promise<any> => auth0Client.getTokenSilently(...p),
                getTokenWithPopup: (...p): Promise<string> => auth0Client.getTokenWithPopup(...p),
                logout: (...p): void => auth0Client.logout(...p),
            }}
        >
            {children}
        </Auth0Context.Provider>
    );

    const mockAuth0ContextProvider = (
        <Auth0Context.Provider
            value={
                {
                    isAuthenticated: EnvironmentConfig.isAuthenticated,
                    loading: EnvironmentConfig.loading,
                    getIdTokenClaims: (): Promise<IdToken> =>
                        new Promise((resolve) =>
                            resolve({ [AuthConfig.permissionsClaim]: EnvironmentConfig.permissions } as IdToken),
                        ),
                } as Auth0ContextWrapper
            }
        >
            {children}
        </Auth0Context.Provider>
    );

    return EnvironmentConfig.isMocking ? mockAuth0ContextProvider : actualAuth0ContextProvider;
};
