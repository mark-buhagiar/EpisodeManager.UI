import EnvironmentConfig from './environmentConfig';

const AuthConfig = {
    domain: 'episodemanager.eu.auth0.com',
    clientId: 'jho2qfvcVXxe30tA7fZepmfLTfZizj1W',
    audience: 'https://episodemanager.eu',
    get permissionsClaim(): string {
        return this.audience + '/permissions';
    },
};

/* use the test client on Auth0
AuthConfig = {
    ...AuthConfig,
    clientId: '9JEzUu9Ka1TmfaqjAAUIIoc8aAHqEKdR',
};
*/

export default AuthConfig;
