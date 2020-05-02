import React, { useState, useEffect } from 'react';
import Show from '../../models/Show';
import ShowFilter from './ShowFilter';
import SeasonFilter from './SeasonFilter';
import './Filters.scss';

interface Props {
    onSelectedShowChanged: (selectedShowId: number) => void;
    onSelectedSeasonChanged: (selectedSeason: number | undefined) => void;
    seasons: number[];
    className: string;
}

const Filters: React.FC<Props> = ({
    onSelectedShowChanged,
    onSelectedSeasonChanged,
    seasons,
    className = '',
}): JSX.Element => {
    const [selectedShow, setSelectedShow] = useState<Show | null>(null);
    const [availableSeasons, setAvailableSeasons] = useState<number[]>([]);

    useEffect(() => {
        setAvailableSeasons(seasons);
    }, [seasons]);

    function handleShowSelected(show: Show): void {
        if (show.id === selectedShow?.id) return;
        onSelectedShowChanged(show.id);
        setSelectedShow(show);
        setAvailableSeasons([]);
    }

    return (
        <div className={`filters ${className}`}>
            <ShowFilter onShowSelected={handleShowSelected} className="show-filter" />
            <SeasonFilter
                availableSeasons={availableSeasons}
                onSeasonSelected={onSelectedSeasonChanged}
                className="season-filter"
            />
        </div>
    );
};

export default Filters;
