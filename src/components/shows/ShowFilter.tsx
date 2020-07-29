import { Autocomplete } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';
import { getAllForListing } from '../../api/showsApi';
import Show from '../../models/Show';
import { TextField } from '@material-ui/core';

interface Props {
    className?: string;
    onShowSelected: (show: Show) => void;
}

const ShowFilters: React.FC<Props> = ({ onShowSelected, className = '' }): JSX.Element => {
    const [allShows, setAllShows] = useState<Show[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedShow, setSelectedShow] = useState<Show | null>(null);

    // Get all shows
    useEffect(() => {
        async function getData(): Promise<void> {
            const allShows = await getAllForListing();
            setAllShows(allShows);
            setLoading(false);
        }

        getData();
    }, []);

    function handleShowSelected(show: Show): void {
        if (show === null) return;
        setSelectedShow(show);
        onShowSelected(show);
    }

    return (
        <Autocomplete
            autoHighlight={true}
            disableClearable={true}
            options={allShows}
            loading={loading}
            value={selectedShow}
            className={className}
            onChange={(event: any, value: Show | null): void => handleShowSelected(value as Show)}
            getOptionLabel={(option: Show): string => option.title}
            renderInput={(params): JSX.Element => <TextField {...params} label="Show" variant="outlined" />}
        />
    );
};

export default ShowFilters;
