import React, { useState, useEffect } from 'react';
import Panel from '../common/panel';
import Show from '../../models/Show';
import { getAllForListing } from '../../api/showsApi';
import * as usersApi from '../../api/usersApi';

const ManageSubscriptions: React.FC = (): JSX.Element => {
    const [subscribedShows, setSubscribedShows] = useState<Show[]>([]);
    const [allShows, setAllShows] = useState<Show[]>([]);

    useEffect(() => {
        async function getData(): Promise<void> {
            const userSubscriptions = await usersApi.getUserSubscriptionsForListing();
            setSubscribedShows(userSubscriptions);
        }

        getData();
    }, []);

    useEffect(() => {
        async function getData(): Promise<void> {
            const allShows = await getAllForListing();
            setAllShows(allShows);
        }

        getData();
    }, []);

    async function handleUnsubscribeClicked({ id }: Show): Promise<void> {
        await usersApi.unsubscribeFromShow(id);
        setSubscribedShows(subscribedShows.filter((sub) => sub.id !== id));
    }

    return (
        <Panel title="Manage Subscriptions">
            <>Multi-select dropdown</>
            <>
                {subscribedShows.map((sub) => (
                    <div key={sub.id}>
                        <span
                            className="material-icons clickable"
                            onClick={(): Promise<void> => handleUnsubscribeClicked(sub)}
                        >
                            clear
                        </span>
                        {sub.title}
                    </div>
                ))}
            </>
        </Panel>
    );
};

export default ManageSubscriptions;
