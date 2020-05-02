import Table from '../common/table';
import React, { useEffect, useMemo, useState } from 'react';
import useGroupedEpisodes from '../../hooks/useGroupedEpisodes';
import Column from '../../models/Column';
import { QualityId } from '../../models/enums/Qualities';
import SortDirection from '../../models/enums/SortDirection';
import Episode, { hasSeasonAndNumber } from '../../models/Episode';
import SortingInfo from '../../models/SortingInfo';
import { airDateSortComparer, DownloadLink, seasonSortComparator, ViewEpisode } from '../../models/ViewEpisode';
import { ButtonProps } from '../common/button/Button';
import ButtonGroup from '../common/button/ButtonGroup';

interface Props {
    episodes: Episode[];
    filterOnSeason: number | undefined;
}

const defaultSeasonSortingInfo = {
    direction: SortDirection.DESCENDING,
    field: 'season',
    sortComparer: seasonSortComparator,
} as SortingInfo<ViewEpisode>;

const defaultAirDateSortingInfo = {
    direction: SortDirection.DESCENDING,
    field: 'airDate',
    sortComparer: airDateSortComparer,
} as SortingInfo<ViewEpisode>;

const EpisodeListing: React.FC<Props> = ({ episodes, filterOnSeason }): JSX.Element => {
    const allEpisodes = useGroupedEpisodes(episodes);
    const [filteredEpisodes, setFilteredEpisodes] = useState<ViewEpisode[]>([]);
    const [displaySeasonAndNumber, setDisplaySeasonAndNumber] = useState(false);
    const [displayAirDate, setDisplayAirDate] = useState(false);
    const [sortingInfo, setSortingInfo] = useState(defaultSeasonSortingInfo);

    function generateDownloadColumn(episode: ViewEpisode): JSX.Element {
        const onClick = (downloadLink: DownloadLink): (() => void) => (): Window | null =>
            window.open(downloadLink.link, '_blank');

        const getQualityLabel = (downloadLink: DownloadLink): string => {
            switch (downloadLink.quality) {
                case QualityId.StandardDef:
                    return 'SD';
                case QualityId.P720:
                    return '720p';
                case QualityId.P1080:
                    return '1080p';
                default:
                    return '';
            }
        };

        const buttons = episode.downloadLinks.map(
            (downloadLink) => ({ label: getQualityLabel(downloadLink), onClick: onClick(downloadLink) } as ButtonProps),
        );

        return <ButtonGroup buttons={buttons} className="quality-buttons" />;
    }

    const columns = useMemo(() => {
        const columns = [
            new Column<ViewEpisode>(1, 'Title', 'title'),
            new Column<ViewEpisode>(2, 'Download', (episode) => generateDownloadColumn(episode)),
        ] as Column<ViewEpisode>[];

        if (displayAirDate)
            columns.splice(0, 0, new Column<ViewEpisode>(3, 'Air Date', 'airDate', airDateSortComparer));
        if (displaySeasonAndNumber)
            columns.splice(
                0,
                0,
                new Column<ViewEpisode>(4, 'Season', 'season', seasonSortComparator),
                new Column<ViewEpisode>(5, 'Number', 'number'),
            );

        return columns;
    }, [displaySeasonAndNumber, displayAirDate]);

    useEffect(() => {
        const filteredEpisodes =
            filterOnSeason !== undefined ? allEpisodes.filter((x) => x.season === filterOnSeason) : allEpisodes;

        const displayAirDate = filteredEpisodes.filter((episode) => !hasSeasonAndNumber(episode)).length > 0;
        const displaySeasonAndNumber = filteredEpisodes.filter((episode) => hasSeasonAndNumber(episode)).length > 0;

        const sort = displaySeasonAndNumber ? defaultSeasonSortingInfo : defaultAirDateSortingInfo;

        setDisplayAirDate(displayAirDate);
        setDisplaySeasonAndNumber(displaySeasonAndNumber);
        setFilteredEpisodes(filteredEpisodes);
        setSortingInfo(sort);
    }, [filterOnSeason, allEpisodes]);

    return <Table columns={columns} data={filteredEpisodes} sort={sortingInfo}></Table>;
};

export default EpisodeListing;
