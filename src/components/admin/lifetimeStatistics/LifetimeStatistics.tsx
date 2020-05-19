import React, { useState, useEffect } from 'react';
import PromiseStatus from './../../../models/PromiseStatus';
import { Qualities } from '../../../models/enums/Qualities';
import * as showsApi from '../../../api/showsApi';
import * as usersApi from '../../../api/usersApi';
import ComponentLoading from '../../loading/ComponentLoading';
import EpisodeCountQualityDistribution from '../../../models/EpisodeCountQualityDistribution';
import Panel from '../../common/panel';

const LifetimeStatistics: React.FC = (): JSX.Element => {
    const [isLoading, setIsLoading] = useState(false);
    const [userCount, setUserCount] = useState<number | null>(null);
    const [totalShowCount, setTotalShowCount] = useState<number | null>(null);
    const [episodeCount, setEpisodeCount] = useState<EpisodeCountQualityDistribution[] | null>(null);

    useEffect(() => {
        async function getData(): Promise<void> {
            setIsLoading(true);
            const usersPromise = usersApi.getTotalUserCount();
            const showsPromise = showsApi.getTotalShowCount();
            const episodesPromise = showsApi.getEpisodeCountQualityDistribution();

            const [users, shows, episodes] = await Promise.all(
                [usersPromise, showsPromise, episodesPromise].map((p: Promise<any>) =>
                    p
                        .then((result): PromiseStatus => ({ result, success: true } as PromiseStatus))
                        .catch((): PromiseStatus => ({ success: false } as PromiseStatus)),
                ),
            );

            setUserCount(users.success ? users.result : null);
            setTotalShowCount(shows.success ? shows.result : null);
            setEpisodeCount(episodes.success ? episodes.result : null);
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
                    <div>{`# of users: ${userCount ?? 'N/A'}`}</div>
                    <div>{`# of shows: ${totalShowCount ?? 'N/A'}`}</div>
                    {episodeCount?.map((qualityDistribution) => (
                        <div key={qualityDistribution.quality}>
                            {`# of episodes (${
                                Qualities.find((x) => x.id === qualityDistribution.quality)?.description ?? 'N/A'
                            }): ${qualityDistribution.count}`}
                        </div>
                    )) ?? 'Quality distribution N/A'}
                </>
            )}
        </Panel>
    );
};

export default LifetimeStatistics;
