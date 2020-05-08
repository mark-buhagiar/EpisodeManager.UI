import EnvironmentConfig from './environmentConfig';

let ApiConfig = {
    feedParserApiBase: 'https://feedparser.episodemanager.eu/api/v1/',
    showsApiBase: 'https://shows.episodemanager.eu/api/v1/',
    usersApiBase: 'https://users.episodemanager.eu/api/v1/',
};

if (EnvironmentConfig.isMocking) {
    ApiConfig = {
        feedParserApiBase: 'http://localhost:3001/',
        showsApiBase: 'http://localhost:3001/',
        usersApiBase: 'http://localhost:3001/',
    };
}

export default ApiConfig;
