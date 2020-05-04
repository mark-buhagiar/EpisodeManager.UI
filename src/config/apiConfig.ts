import EnvironmentConfig from './environmentConfig';

let ApiConfig = {
    feedParserApiBase: 'https://localhost:6003/api/v1/',
    showsApiBase: 'https://localhost:6001/api/v1/',
    usersApiBase: 'https://localhost:6002/api/v1/',
};

if (EnvironmentConfig.isMocking) {
    ApiConfig = {
        feedParserApiBase: 'http://localhost:3001/',
        showsApiBase: 'http://localhost:3001/',
        usersApiBase: 'http://localhost:3001/',
    };
}

export default ApiConfig;
