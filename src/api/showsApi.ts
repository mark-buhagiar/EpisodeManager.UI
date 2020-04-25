import axios from 'axios';
import Episode from '../models/Episode';
import EnvironmentConfig from '../config/environment';

let baseShowsMsUrl: string;
if (EnvironmentConfig.isMocking) {
    baseShowsMsUrl = 'http://localhost:3001/';
} else {
    baseShowsMsUrl = 'https://localhost:6001/api/v1/';
}

const buildEndpoint = (endpoint: string): string => baseShowsMsUrl + endpoint;

const showsMSEndpoints = {
    getForCurrentUserBetweenDates: buildEndpoint('episodes/getForCurrentUserBetweenDates'),
};

export async function getForCurrentUserBetweenDates(startDate: Date, endDate: Date): Promise<Episode[]> {
    try {
        const params = {
            startDate: startDate,
            endDate: endDate,
        };
        const result = await axios.get<Episode[]>(showsMSEndpoints.getForCurrentUserBetweenDates, { params });
        return result.data;
    } catch (exception) {
        console.log(exception);
        throw exception;
    }
}
