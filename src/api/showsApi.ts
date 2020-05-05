import axios from 'axios';
import moment from 'moment';
import ApiConfig from '../config/apiConfig';
import Episode from '../models/Episode';
import EpisodeCountDailyDistribution from '../models/EpisodeCountDailyDistribution';
import EpisodeCountQualityDistribution from '../models/EpisodeCountQualityDistribution';
import Show from '../models/Show';

const buildEndpoint = (endpoint: string): string => ApiConfig.showsApiBase + endpoint;

const showsMSEndpoints = {
    getAllForListing: buildEndpoint('shows/GetAllForListing'),
    getTotalShowCount: buildEndpoint('shows/GetTotalShowCount'),
    getForCurrentUserBetweenDates: buildEndpoint('episodes/GetForCurrentUserBetweenDates'),
    getForShow: buildEndpoint('episodes/GetForShow'),
    getEpisodeCountDailyDistribution: buildEndpoint('episodes/GetEpisodeCountDailyDistribution'),
    getEpisodeCountQualityDistribution: buildEndpoint('episodes/GetEpisodeCountQualityDistribution'),
};

function convertEpisodeDates(episode: Episode): Episode {
    return { ...episode, publishedDate: new Date(episode.publishedDate) };
}

export async function getForCurrentUserBetweenDates(startDate: Date, endDate: Date): Promise<Episode[]> {
    try {
        const params = {
            startDate: startDate,
            endDate: endDate,
        };
        const result = await axios.get<Episode[]>(showsMSEndpoints.getForCurrentUserBetweenDates, { params });
        return result.data.map(convertEpisodeDates);
    } catch (exception) {
        console.log(exception);
        throw exception;
    }
}

export async function getAllForListing(): Promise<Show[]> {
    try {
        const result = await axios.get<Episode[]>(showsMSEndpoints.getAllForListing);
        return result.data.map(convertEpisodeDates);
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
        return result.data.map(convertEpisodeDates);
    } catch (exception) {
        console.log(exception);
        throw exception;
    }
}

export async function getEpisodeCountDailyDistribution(
    startDate: Date,
    endDate: Date,
): Promise<EpisodeCountDailyDistribution[]> {
    try {
        const params = {
            startDate,
            endDate,
        };
        const result = await axios.get<EpisodeCountDailyDistribution[]>(
            showsMSEndpoints.getEpisodeCountDailyDistribution,
            { params },
        );
        return result.data
            .map((datum) => {
                return { ...datum, date: moment(datum.date).toDate() };
            })
            .sort((a, b) => a.date.getTime() - b.date.getTime());
    } catch (exception) {
        console.log(exception);
        throw exception;
    }
}

export async function getEpisodeCountQualityDistribution(): Promise<EpisodeCountQualityDistribution[]> {
    try {
        const result = await axios.get<EpisodeCountQualityDistribution[]>(
            showsMSEndpoints.getEpisodeCountQualityDistribution,
        );
        return result.data;
    } catch (exception) {
        console.log(exception);
        throw exception;
    }
}

export async function getTotalShowCount(): Promise<number> {
    try {
        const result = await axios.get<number>(showsMSEndpoints.getTotalShowCount);
        return result.data;
    } catch (exception) {
        console.log(exception);
        throw exception;
    }
}
