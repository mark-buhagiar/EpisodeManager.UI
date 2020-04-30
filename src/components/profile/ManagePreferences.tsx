import React, { useEffect, useState } from 'react';
import * as usersApi from '../../api/usersApi';
import { Qualities, Quality } from '../../models/enums/Qualities';
import EpisodePreferences from '../../models/EpisodePreferences';
import Panel from '../common/panel';
import QualityFilter from '../shows/QualityFilter';

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
    }

    return (
        <Panel title="Manage Preferences">
            <QualityFilter
                initialSelection={selectedQualities}
                onSelectionChanged={handleSelectedQualitiesChanged}
                placeholder="Select preferred show qualities"
            />
        </Panel>
    );
};

export default ManagePreferences;
