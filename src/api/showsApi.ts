import axios from 'axios';
import Episode from '../models/Episode';
import ApiConfig from '../config/apiConfig';
import Show from '../models/Show';

const buildEndpoint = (endpoint: string): string => ApiConfig.showsApiBase + endpoint;

const showsMSEndpoints = {
    getForCurrentUserBetweenDates: buildEndpoint('episodes/GetForCurrentUserBetweenDates'),
    getAllForListing: buildEndpoint('shows/GetAllForListing'),
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

export async function getAllForListing(): Promise<Show[]> {
    try {
        const result = await axios.get<Episode[]>(showsMSEndpoints.getAllForListing);
        return result.data;
    } catch (exception) {
        console.log(exception);
        throw exception;
    }
}
