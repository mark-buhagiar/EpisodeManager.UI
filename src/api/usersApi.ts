import axios from 'axios';
import ApiConfig from '../config/apiConfig';
import Show from '../models/Show';

const buildEndpoint = (endpoint: string): string => ApiConfig.usersApiBase + endpoint;

const usersMSEndpoints = {
    addEpisodeDownloaded: buildEndpoint('subscriptions/AddEpisodeDownloaded'),
    getUserSubscriptionsForListing: buildEndpoint('subscriptions/GetUserSubscriptionsForListing'),
    unsubscribeFromShow: buildEndpoint('subscriptions/UnsubscribeFromShow'),
};

export async function addEpisodeDownloaded(episodeId: number): Promise<void> {
    try {
        const params = {
            episodeId,
        };
        await axios.put(usersMSEndpoints.addEpisodeDownloaded, null, { params });
    } catch (exception) {
        console.log(exception);
        throw exception;
    }
}

export async function getUserSubscriptionsForListing(): Promise<Show[]> {
    try {
        const result = await axios.get(usersMSEndpoints.getUserSubscriptionsForListing);
        return result.data;
    } catch (exception) {
        console.log(exception);
        throw exception;
    }
}

export async function unsubscribeFromShow(showId: number): Promise<void> {
    try {
        const params = {
            showId,
        };
        await axios.patch(usersMSEndpoints.unsubscribeFromShow, { params });
    } catch (exception) {
        console.log(exception);
        throw exception;
    }
}
