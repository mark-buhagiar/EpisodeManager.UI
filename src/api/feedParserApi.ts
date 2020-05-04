import axios from 'axios';
import ApiConfig from '../config/apiConfig';
import ParseHistoryListing from '../models/ParseHistoryListing';
import ParseHistoryDetails from '../models/ParseHistoryDetails';
import moment from 'moment';

const buildEndpoint = (endpoint: string): string => ApiConfig.feedParserApiBase + endpoint;

const feedParserMSEndpoints = {
    syncWithShowRss: buildEndpoint('sync/SyncWithShowRss'),
    forceSyncParseHistory: buildEndpoint('sync/ForceSyncParseHistory'),
    getParseHistoryBetweenDates: buildEndpoint('ParseHistory/GetParseHistoryBetweenDates'),
    getParseHistoryDetails: buildEndpoint('ParseHistory/GetParseHistoryDetails'),
};

export async function syncWithShowRss(): Promise<void> {
    try {
        await axios.post(feedParserMSEndpoints.syncWithShowRss);
    } catch (exception) {
        console.log(exception);
        throw exception;
    }
}

function convertDates(listing: ParseHistoryListing): ParseHistoryListing {
    return {
        ...listing,
        retrievedOn: moment.utc(listing.retrievedOn).toDate(),
        lastSyncedOn: moment.utc(listing.lastSyncedOn).toDate(),
    };
}

export async function getParseHistoryBetweenDates(startDate: Date, endDate: Date): Promise<ParseHistoryListing[]> {
    try {
        const params = {
            startDate,
            endDate,
        };
        const parseHistory = await axios.get<ParseHistoryListing[]>(feedParserMSEndpoints.getParseHistoryBetweenDates, {
            params,
        });

        return parseHistory.data.map(convertDates);
    } catch (exception) {
        console.log(exception);
        throw exception;
    }
}

export async function getParseHistoryDetails(id: number): Promise<ParseHistoryDetails> {
    try {
        const params = {
            parseHistoryId: id,
        };
        const parseHistoryDetails = await axios.get<ParseHistoryDetails>(feedParserMSEndpoints.getParseHistoryDetails, {
            params,
        });

        return parseHistoryDetails.data;
    } catch (exception) {
        console.log(exception);
        throw exception;
    }
}
export async function forceSyncParseHistory(id: number): Promise<void> {
    try {
        const params = {
            parseHistoryId: id,
        };

        await axios.post(feedParserMSEndpoints.forceSyncParseHistory, null, {
            params,
        });
    } catch (exception) {
        console.log(exception);
        throw exception;
    }
}
