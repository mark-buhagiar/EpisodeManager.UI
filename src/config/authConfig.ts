const AuthConfig = {
    domain: 'episodemanager.eu.auth0.com',
    clientId: 'jho2qfvcVXxe30tA7fZepmfLTfZizj1W',
    audience: 'https://episodemanager.eu',
    get permissionsClaim(): string {
        return this.audience + '/permissions';
    },
};

export default AuthConfig;
