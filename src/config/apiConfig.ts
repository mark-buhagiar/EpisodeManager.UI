import EnvironmentConfig from './environmentConfig';

let ApiConfig = {
    showsApiBase: 'https://localhost:6001/api/v1/',
    usersApiBase: 'https://localhost:6002/api/v1/',
};

if (EnvironmentConfig.isMocking) {
    ApiConfig = {
        showsApiBase: 'http://localhost:3001/',
        usersApiBase: 'http://localhost:3001/',
    };
}

export default ApiConfig;
