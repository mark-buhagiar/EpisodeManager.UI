import React, { useState, useEffect } from 'react';
import { Qualities } from '../../../models/enums/Qualities';
import * as showsApi from '../../../api/showsApi';
import * as usersApi from '../../../api/usersApi';
import ComponentLoading from '../../loading/ComponentLoading';
import EpisodeCountQualityDistribution from '../../../models/EpisodeCountQualityDistribution';
import Panel from '../../common/panel';

const LifetimeStatistics: React.FC = (): JSX.Element => {
    const [isLoading, setIsLoading] = useState(false);
    const [userCount, setUserCount] = useState(0);
    const [totalShowCount, setTotalShowCount] = useState(0);
    const [episodeCount, setEpisodeCount] = useState<EpisodeCountQualityDistribution[]>([]);

    useEffect(() => {
        async function getData(): Promise<void> {
            setIsLoading(true);
            const usersPromise = await usersApi.getTotalUserCount();
            const showsPromise = await showsApi.getTotalShowCount();
            const episodesPromise = await showsApi.getEpisodeCountQualityDistribution();

            const [users, shows, episodes] = await Promise.all([usersPromise, showsPromise, episodesPromise]);
            setUserCount(users);
            setTotalShowCount(shows);
            setEpisodeCount(episodes);
            setIsLoading(false);
        }

        getData();
    }, []);

    return (
        <Panel title="Lifetime Statistics">
            {isLoading ? (
                <ComponentLoading />
            ) : (
                <>
                    <div># of users: {userCount}</div>
                    <div># of shows: {totalShowCount}</div>
                    {episodeCount.map((qualityDistribution) => (
                        <div key={qualityDistribution.quality}>
                            {`# of episodes (
                            ${Qualities.find((x) => x.id === qualityDistribution.quality)?.description ?? 'N/A'}
                            ): ${qualityDistribution.count}`}
                        </div>
                    ))}
                </>
            )}
        </Panel>
    );
};

export default LifetimeStatistics;
