import EpisodeCountQualityDistribution from './EpisodeCountQualityDistribution';

export default interface EpisodeCountDailyDistribution {
    qualityDistribution: EpisodeCountQualityDistribution[];
    date: Date;
}
