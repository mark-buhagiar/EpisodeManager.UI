import axios from 'axios';
import ApiConfig from '../config/apiConfig';
import EpisodePreferences from '../models/EpisodePreferences';
import Show from '../models/Show';

const buildEndpoint = (endpoint: string): string => ApiConfig.usersApiBase + endpoint;

const usersMSEndpoints = {
    addEpisodeDownloaded: buildEndpoint('subscriptions/AddEpisodeDownloaded'),
    getUserSubscriptionsForListing: buildEndpoint('subscriptions/GetUserSubscriptionsForListing'),
    unsubscribeFromShow: buildEndpoint('subscriptions/UnsubscribeFromShow'),
    subscribeToShow: buildEndpoint('subscriptions/SubscribeToShow'),
    setUserEpisodePreferences: buildEndpoint('users/setUserEpisodePreferences'),
    getUserEpisodePreferences: buildEndpoint('users/getUserEpisodePreferences'),
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

export async function subscribeToShow(showIds: number[]): Promise<void> {
    try {
        const params = {
            showIds,
        };
        await axios.put(usersMSEndpoints.subscribeToShow, null, { params });
    } catch (exception) {
        console.log(exception);
        throw exception;
    }
}

export async function setUserEpisodePreferences(preferences: EpisodePreferences): Promise<void> {
    try {
        await axios.post(usersMSEndpoints.setUserEpisodePreferences, preferences);
    } catch (exception) {
        console.log(exception);
        throw exception;
    }
}

export async function getUserEpisodePreferences(): Promise<EpisodePreferences> {
    try {
        const response = await axios.get(usersMSEndpoints.getUserEpisodePreferences);
        return response.data;
    } catch (exception) {
        console.log(exception);
        throw exception;
    }
}
