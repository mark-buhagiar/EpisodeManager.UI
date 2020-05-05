import { QualityId } from './enums/Qualities';

export default interface EpisodeCountQualityDistribution {
    count: number;
    quality: QualityId;
}
