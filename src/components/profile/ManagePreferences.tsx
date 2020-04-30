import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';
import * as usersApi from '../../api/usersApi';
import { Qualities, Quality } from '../../models/enums/Qualities';
import Panel from '../common/panel';
import EpisodePreferences from '../../models/EpisodePreferences';

const ManagePreferences: React.FC = (): JSX.Element => {
    const [selectedQualities, setSelectedQualities] = useState<Quality[]>([]);

    // Get user preferences
    useEffect(() => {
        async function getData(): Promise<void> {
            const preferences = await usersApi.getUserEpisodePreferences();
            const preferredQualities = preferences.qualities;
            setSelectedQualities(Qualities.filter((x) => preferredQualities.includes(x.id)));
        }
        getData();
    }, []);

    async function handleSelectedQualitiesChanged(newQualities: Quality[]): Promise<void> {
        await usersApi.setUserEpisodePreferences({ qualities: newQualities.map((x) => x.id) } as EpisodePreferences);
        setSelectedQualities(newQualities);
    }

    return (
        <Panel title="Manage Preferences">
            <div className="qualities-selector">
                <Autocomplete
                    multiple={true}
                    autoHighlight={true}
                    filterSelectedOptions={true}
                    disableCloseOnSelect={true}
                    options={Qualities}
                    value={selectedQualities}
                    onChange={(event, value): Promise<void> => handleSelectedQualitiesChanged(value)}
                    getOptionLabel={(option): string => option.description}
                    renderInput={(params): JSX.Element => (
                        <TextField {...params} label="Select preferred show qualities" variant="outlined" />
                    )}
                />
            </div>
        </Panel>
    );
};

export default ManagePreferences;
