import axios from 'axios';
import ApiConfig from '../config/apiConfig';

const buildEndpoint = (endpoint: string): string => ApiConfig.usersApiBase + endpoint;

const usersMSEndpoints = {
    addEpisodeDownloaded: buildEndpoint('subscriptions/AddEpisodeDownloaded'),
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
