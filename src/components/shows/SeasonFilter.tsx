import { FormControl, MenuItem, Select, InputLabel } from '@material-ui/core';
import React, { useEffect, useState, useRef } from 'react';

interface Props {
    onSeasonSelected: (season: number | undefined) => void;
    availableSeasons: number[];
    className?: string;
}

const SeasonFilter: React.FC<Props> = ({ availableSeasons, onSeasonSelected, className = '' }): JSX.Element => {
    const [selectedSeason, setSelectedSeason] = useState<number>(-1);
    const visibilityThief = useRef<HTMLSelectElement>(null);

    const label = 'Season';

    useEffect(() => {
        setSelectedSeason(-1);
    }, [availableSeasons]);

    function handleSeasonSelected(event: React.ChangeEvent<{ value: unknown }>): void {
        const selectedVal = event.target.value as number;
        setSelectedSeason(selectedVal);
        onSeasonSelected(selectedVal < 0 ? undefined : selectedVal);
    }

    return (
        <FormControl className={className} variant="outlined" disabled={availableSeasons.length < 1}>
            <InputLabel>{label}</InputLabel>
            <Select value={selectedSeason} onChange={handleSeasonSelected} label={label} ref={visibilityThief}>
                <MenuItem key={-1} value={-1}>
                    All
                </MenuItem>
                {availableSeasons
                    .sort((a, b) => (a > b ? 1 : -1))
                    .map((season) => (
                        <MenuItem key={season} value={season}>
                            Season {season}
                        </MenuItem>
                    ))}
            </Select>
        </FormControl>
    );
};

export default SeasonFilter;
