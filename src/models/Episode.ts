import { QualityId } from './enums/Qualities';

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
