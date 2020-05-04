export default interface ParseHistoryListing {
    id: number;
    retrievedOn: Date;
    lastSyncedOn: Date;
    episodeCount: number;
    syncCount: number;
    success: boolean;
}
