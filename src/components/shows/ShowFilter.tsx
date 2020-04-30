import { Autocomplete } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';
import { getAllForListing } from '../../api/showsApi';
import Show from '../../models/Show';
import { TextField } from '@material-ui/core';

interface Props {
    onShowSelected: (show: Show) => void;
}

const ShowFilters: React.FC<Props> = (props: Props): JSX.Element => {
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
        setSelectedShow(show);
        props.onShowSelected(show);
    }

    return (
        <Autocomplete
            autoHighlight={true}
            options={allShows}
            loading={loading}
            value={selectedShow}
            onChange={(event: any, value: Show | null): void => handleShowSelected(value as Show)}
            getOptionLabel={(option): string => option.title}
            renderInput={(params): JSX.Element => <TextField {...params} label="Select Show" variant="outlined" />}
        />
    );
};

export default ShowFilters;
