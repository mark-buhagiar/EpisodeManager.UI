import axios from 'axios';
import Episode from '../models/Episode';
import ApiConfig from '../config/apiConfig';
import Show from '../models/Show';

const buildEndpoint = (endpoint: string): string => ApiConfig.showsApiBase + endpoint;

const showsMSEndpoints = {
    getForCurrentUserBetweenDates: buildEndpoint('episodes/GetForCurrentUserBetweenDates'),
    getAllForListing: buildEndpoint('shows/GetAllForListing'),
    getForShow: buildEndpoint('episodes/GetForShow'),
};

function convertDates(episode: Episode): Episode {
    return { ...episode, publishedDate: new Date(episode.publishedDate) };
}

export async function getForCurrentUserBetweenDates(startDate: Date, endDate: Date): Promise<Episode[]> {
    try {
        const params = {
            startDate: startDate,
            endDate: endDate,
        };
        const result = await axios.get<Episode[]>(showsMSEndpoints.getForCurrentUserBetweenDates, { params });
        return result.data.map(convertDates);
    } catch (exception) {
        console.log(exception);
        throw exception;
    }
}

export async function getAllForListing(): Promise<Show[]> {
    try {
        const result = await axios.get<Episode[]>(showsMSEndpoints.getAllForListing);
        return result.data.map(convertDates);
    } catch (exception) {
        console.log(exception);
        throw exception;
    }
}

export async function getForShow(showId: number): Promise<Episode[]> {
    try {
        const params = {
            showId: showId,
        };
        const result = await axios.get<Episode[]>(showsMSEndpoints.getForShow, { params });
        return result.data.map(convertDates);
    } catch (exception) {
        console.log(exception);
        throw exception;
    }
}
