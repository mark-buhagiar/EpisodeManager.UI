import React, { useState } from 'react';
import EpisodeListing from './EpisodeListing';
import Filters from './Filters';
import Episode from '../../models/Episode';
import * as showsApi from '../../api/showsApi';
import ComponentLoading from '../loading/ComponentLoading';
import './ShowsPage.scss';
import withAuthenticationRequired from '../../HoC/withAuthenticationRequired';

const ShowsPage: React.FC = (): JSX.Element => {
    const [showId, setShowId] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [episodes, setShowEpisodes] = useState<Episode[]>([]);
    const [filterSeason, setFilterSeason] = useState<number | undefined>(undefined);
    const [availableSeasons, setAvailableSeasons] = useState<number[]>([]);

    async function onSelectedShowChanged(selectedShowId: number): Promise<void> {
        setLoading(true);
        const episodes = await showsApi.getForShow(selectedShowId);
        setShowId(selectedShowId);
        setShowEpisodes(episodes);
        setAvailableSeasons(
            Array.from(
                episodes.reduce((seasons, currEp) => {
                    if (currEp.season !== undefined && currEp.season !== null) seasons.add(currEp.season);
                    return seasons;
                }, new Set<number>()),
            ),
        );
        setLoading(false);
    }

    function handleSelectedSeasonChanged(selectedSeason: number | undefined): void {
        setFilterSeason(selectedSeason);
    }

    const body = (): React.ReactNode => {
        if (loading) {
            return <ComponentLoading />;
        } else if (showId === null) {
            return <span>Select a show to see its episodes</span>;
        } else if (episodes.length === 0) {
            return <span>No Episodes Available</span>;
        } else {
            return <EpisodeListing episodes={episodes} filterOnSeason={filterSeason} />;
        }
    };

    return (
        <div className="shows-page">
            <div className="title">Shows</div>
            <Filters
                onSelectedShowChanged={onSelectedShowChanged}
                onSelectedSeasonChanged={handleSelectedSeasonChanged}
                seasons={availableSeasons}
                className="filters"
            />
            <div className="results">{body()}</div>
        </div>
    );
};

export default withAuthenticationRequired(ShowsPage);
