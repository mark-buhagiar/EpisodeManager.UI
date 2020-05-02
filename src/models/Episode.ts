import { QualityId } from './enums/Qualities';
import { ViewEpisode } from './ViewEpisode';

export default interface Episode {
    id: number;
    title: string;
    show: string;
    publishedDate: Date;
    season?: number;
    number?: number;
    airDate?: string;
    quality: QualityId;
    repack: boolean;
    link: string;
    downloaded: boolean;
}

export function hasSeasonAndNumber(episode: Episode | ViewEpisode): boolean {
    return (
        episode.season !== undefined &&
        episode.season !== null &&
        episode.number !== undefined &&
        episode.number !== null
    );
}
