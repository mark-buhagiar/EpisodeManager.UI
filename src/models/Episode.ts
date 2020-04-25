import { Quality } from './enums/Qualities';

export default interface Episode {
    id: number;
    title: string;
    show: string;
    publishedDate: Date;
    season?: number;
    number?: number;
    airDate?: string;
    quality: Quality;
    repack: boolean;
    link: string;
    downloaded: boolean;
}
