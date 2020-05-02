import { Moment } from 'moment';
import { QualityId } from './enums/Qualities';
import { SortComparer } from '../models/SortComparer';
import IndexableObject from './IndexableObject';

export interface ViewEpisode extends IndexableObject {
    season: number;
    number: number;
    airDate: string;
    airDateDate: Moment;
    title: string;
    downloadLinks: DownloadLink[];
}

export interface DownloadLink {
    quality: QualityId;
    link: string;
}

export const seasonSortComparator: SortComparer<ViewEpisode> = (a: ViewEpisode, b: ViewEpisode): number => {
    if (a.season > b.season) return 1;
    if (a.season < b.season) return -1;

    if (a.number > b.number) return 1;
    if (a.number < b.number) return -1;

    return 0;
};

export const airDateSortComparer: SortComparer<ViewEpisode> = (a: ViewEpisode, b: ViewEpisode): number => {
    return a.airDateDate.isSameOrAfter(b.airDateDate) ? 1 : -1;
};
