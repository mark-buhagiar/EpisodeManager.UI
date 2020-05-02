import React, { useEffect, useState, useMemo } from 'react';
import { groupBy } from '../../helpers/arrayHelpers';
import Episode from '../../models/Episode';
import { TableContainer, Table, TableRow, TableHead, TableCell, TableBody } from '@material-ui/core';
import { ButtonProps } from '../common/button/Button';
import { QualityId } from '../../models/enums/Qualities';
import ButtonGroup from '../common/button/ButtonGroup';
import { formStringToDateFormat } from '../../helpers/dateHelpers';
import moment, { Moment } from 'moment';

interface Props {
    episodes: Episode[];
    filterOnSeason: number | undefined;
}

interface ViewEpisode {
    key: string;
    season: number;
    number: number;
    airDate: string;
    airDateDate: Moment;
    title: string;
    downloadLinks: DownloadLink[];
}

interface DownloadLink {
    quality: QualityId;
    link: string;
}

enum SortDirection {
    ASCENDING = 1,
    DESCENDING = 2,
}

interface SortingInfo<T> {
    field: keyof T;
    direction: SortDirection;
    sortComparer: SortComparer<T>;
}

type SortComparer<T> = (a: T, b: T) => number;

class Column<T> {
    private _id: number | string;
    private _header: string;
    private _field: keyof T | ((item: T) => React.ReactNode);
    private _sortComparator?: SortComparer<T>;

    get id(): number | string {
        return this._id;
    }

    get header(): string {
        return this._header;
    }

    get sortComparator(): SortComparer<T> | undefined {
        return this._sortComparator;
    }

    field(item: T): string | React.ReactNode {
        return typeof this._field === 'function' ? this._field(item) : item[this._field];
    }

    rawField(): keyof T | undefined {
        if (typeof this._field === 'function') return undefined;
        return this._field;
    }

    constructor(
        id: number | string,
        header: string,
        field: keyof T | ((item: T) => React.ReactNode),
        sortComparator?: SortComparer<T>,
    ) {
        this._id = id;
        this._header = header;
        this._field = field;

        // We cannot be allowed to sort on a column which has a render
        if (typeof field !== 'function') this._sortComparator = sortComparator;
    }
}

const seasonSortComparator: SortComparer<ViewEpisode> = (a: ViewEpisode, b: ViewEpisode): number => {
    if (a.season > b.season) return 1;
    if (a.season < b.season) return -1;

    if (a.number > b.number) return 1;
    if (a.number < b.number) return -1;

    return 0;
};

const airDateSortComparer: SortComparer<ViewEpisode> = (a: ViewEpisode, b: ViewEpisode): number => {
    return a.airDateDate.isSameOrAfter(b.airDateDate) ? 1 : -1;
};

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
    const [allEpisodes, setAllEpisodes] = useState<ViewEpisode[]>([]);
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

    const hasSeasonAndNumber = (episode: Episode | ViewEpisode): boolean =>
        episode.season !== undefined &&
        episode.season !== null &&
        episode.number !== undefined &&
        episode.number !== null;

    useEffect(() => {
        // Reset the filtered episodes
        setFilteredEpisodes([]);

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

        setAllEpisodes(
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

    useEffect(() => {
        // If no data to sort return
        if (filteredEpisodes.length < 1) return;

        setFilteredEpisodes(
            filteredEpisodes.sort((a, b): number => {
                const sort = sortingInfo.sortComparer(a, b);
                return sortingInfo.direction === SortDirection.DESCENDING ? sort * -1 : sort;
            }),
        );
    }, [filteredEpisodes, sortingInfo]);

    function handleSortChanged(sortingInfo: SortingInfo<ViewEpisode>): void {
        setSortingInfo(sortingInfo);
    }

    function onTableHeaderClicked(column: Column<ViewEpisode>): void {
        // If you can't sort on this column just jump out
        if (column.sortComparator === undefined) return;
        // If we currently don't have a sort, jump out (dependency array)
        if (sortingInfo === undefined) return;

        // If we are sorting on the same field again, flip the sort, otherwise by default go descending
        const sortDirection =
            sortingInfo.field === column.rawField()
                ? sortingInfo.direction === SortDirection.ASCENDING
                    ? SortDirection.DESCENDING
                    : SortDirection.ASCENDING
                : SortDirection.DESCENDING;

        handleSortChanged({
            direction: sortDirection,
            sortComparer: column.sortComparator,
            field: column.rawField(),
        } as SortingInfo<ViewEpisode>);
    }

    function getSortIcon<T>(column: Column<T>): React.ReactNode {
        // If no sorting info, or not sorting on this column, show nothing
        if (sortingInfo === undefined || sortingInfo.field !== column.rawField()) return <></>;
        return sortingInfo.direction === SortDirection.ASCENDING ? (
            <span className="material-icons">arrow_upward</span>
        ) : (
            <span className="material-icons">arrow_downward</span>
        );
    }

    return (
        <>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell key={column.id}>
                                    <div
                                        className={`table-cell ${
                                            column.sortComparator !== undefined ? 'clickable' : ''
                                        }`}
                                        onClick={(): void => onTableHeaderClicked(column)}
                                    >
                                        <div>{column.header}</div>
                                        {getSortIcon(column)}
                                    </div>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredEpisodes.map((episode) => (
                            <TableRow key={episode.key}>
                                {columns.map((column) => (
                                    <TableCell key={column.id}>{column.field(episode)}</TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default EpisodeListing;
