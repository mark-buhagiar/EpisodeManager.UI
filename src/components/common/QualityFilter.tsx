import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';
import { Qualities, Quality } from '../../models/enums/Qualities';

export interface Props {
    initialSelection: Quality[];
    onSelectionChanged: (qualities: Quality[]) => void;
    placeholder: string;
}

const QualityFilter: React.FC<Props> = ({ initialSelection, onSelectionChanged, placeholder }): JSX.Element => {
    const [selectedQualities, setSelectedQualities] = useState<Quality[]>(initialSelection);

    useEffect(() => {
        setSelectedQualities(initialSelection);
    }, [initialSelection]);

    function handleSelectedQualitiesChanged(event: any, newQualities: Quality | Quality[]): void {
        newQualities = newQualities as Quality[];
        setSelectedQualities(newQualities);
        onSelectionChanged(newQualities);
    }

    return (
        <Autocomplete
            multiple={true}
            autoHighlight={true}
            filterSelectedOptions={true}
            disableCloseOnSelect={true}
            options={Qualities}
            value={selectedQualities}
            onChange={handleSelectedQualitiesChanged}
            getOptionLabel={(option): string => option.description}
            renderInput={(params): JSX.Element => <TextField {...params} label={placeholder} variant="outlined" />}
        />
    );
};

export default QualityFilter;
