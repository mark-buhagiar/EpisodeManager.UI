import moment from 'moment';
import { useEffect, useState } from 'react';
import { groupBy } from '../helpers/arrayHelpers';
import { formStringToDateFormat } from '../helpers/dateHelpers';
import Episode, { hasSeasonAndNumber } from '../models/Episode';
import { DownloadLink, ViewEpisode } from '../models/ViewEpisode';

const useGroupedEpisodes = (episodes: Episode[]): ViewEpisode[] => {
    const [groupedEpisodes, setGroupedEpisodes] = useState<ViewEpisode[]>([]);

    useEffect(() => {
        // I DON'T THINK WE SHOULD NEED THE BELOW
        // Reset the filtered episodes
        // setFilteredEpisodes([]);

        const groupedEpisodes = groupBy(episodes, (episode) =>
            hasSeasonAndNumber(episode) ? `${episode.season}.${episode.number}` : `${episode.airDate}`,
        );

        function sortQualityGroup(
            { repack: repackA = false, publishedDate: publishedA }: Episode,
            { repack: repackB = false, publishedDate: publishedB }: Episode,
        ): number {
            if (repackA && !repackB) return 1;
            if (!repackA && repackB) return -1;

            return publishedA.getTime() > publishedB.getTime() ? 1 : -1;
        }

        function getDownloadLinksForEpisode(episodeGroup: Episode[]): DownloadLink[] {
            return Object.values(groupBy(episodeGroup, (episode) => String(episode.quality))).reduce(
                (dLinks: DownloadLink[], qualityGroup: Episode[]) => {
                    const bestEpisode = qualityGroup.sort(sortQualityGroup)[0];
                    dLinks.push({ quality: bestEpisode.quality, link: bestEpisode.link } as DownloadLink);
                    return dLinks;
                },
                [] as DownloadLink[],
            );
        }

        setGroupedEpisodes(
            Object.keys(groupedEpisodes).map((episodeGroupKey) => {
                const episodeGroup = groupedEpisodes[episodeGroupKey];
                const latestEpisode = episodeGroup.sort((a, b) =>
                    a.publishedDate.getTime() > b.publishedDate.getTime() ? 1 : -1,
                )[0];
                const downloadLinks = getDownloadLinksForEpisode(episodeGroup);

                const placeholderDate = new Date();
                return {
                    key: `${latestEpisode.season ?? ''}.${latestEpisode.number ?? ''}.${latestEpisode.airDate ?? ''}`,
                    airDate: formStringToDateFormat(latestEpisode.airDate),
                    season: latestEpisode.season,
                    number: latestEpisode.number,
                    airDateDate: moment(latestEpisode.airDate ?? placeholderDate),
                    downloadLinks: downloadLinks,
                    title: latestEpisode.title,
                } as ViewEpisode;
            }),
        );
    }, [episodes]);

    return groupedEpisodes;
};

export default useGroupedEpisodes;
