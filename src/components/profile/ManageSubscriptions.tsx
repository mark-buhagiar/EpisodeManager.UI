import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';
import { getAllForListing } from '../../api/showsApi';
import * as usersApi from '../../api/usersApi';
import Show from '../../models/Show';
import { ButtonProps } from '../common/button/Button';
import ButtonGroup from '../common/button/ButtonGroup';
import Panel from '../common/panel';
import ComponentLoading from '../loading/ComponentLoading';
import './ManageSubscriptions.scss';

const ManageSubscriptions: React.FC = (): JSX.Element => {
    const [subscribedShows, setSubscribedShows] = useState<Show[]>([]);
    const [unsubscribedShows, setUnsubscribedShows] = useState<Show[]>([]);
    const [allShows, setAllShows] = useState<Show[]>([]);
    const [selectedShows, setSelectedShows] = useState<Show[]>([]);

    const [allShowsLoading, setAllShowsLoading] = useState(true);
    const [userSubscriptionsLoading, setUserSubscriptionsLoading] = useState(true);

    // Get user subscriptions
    useEffect(() => {
        async function getData(): Promise<void> {
            const userSubscriptions = await usersApi.getUserSubscriptionsForListing();
            setSubscribedShows(userSubscriptions.sort((a, b) => (a.title >= b.title ? 1 : -1)));
            setUserSubscriptionsLoading(false);
        }

        getData();
    }, []);

    // Get all shows
    useEffect(() => {
        async function getData(): Promise<void> {
            const allShows = await getAllForListing();
            setAllShows(allShows);
            setAllShowsLoading(false);
        }

        getData();
    }, []);

    // Remove subscribed shows from all shows
    useEffect(() => {
        if (allShowsLoading || userSubscriptionsLoading) return;
        const subscribedShowIds = subscribedShows.map((x) => x.id);
        setUnsubscribedShows(
            allShows.filter((x) => !subscribedShowIds.includes(x.id)).sort((a, b) => (a.title >= b.title ? 1 : -1)),
        );
    }, [allShows, subscribedShows, allShowsLoading, userSubscriptionsLoading]);

    async function handleUnsubscribeClicked({ id }: Show): Promise<void> {
        await usersApi.unsubscribeFromShow(id);
        setSubscribedShows(subscribedShows.filter((sub) => sub.id !== id));
    }

    async function handleAddButtonClicked(): Promise<void> {
        const showIdsToAdd = selectedShows.map((selectedShow) => selectedShow.id);
        await usersApi.subscribeToShow(showIdsToAdd);
        setSubscribedShows([...subscribedShows, ...selectedShows]);
        setSelectedShows([]);
    }

    const buttons = [
        {
            label: 'Add',
            enabled: selectedShows.length > 0,
            onClick: handleAddButtonClicked,
        },
    ] as ButtonProps[];

    return (
        <Panel title="Manage Subscriptions">
            <div className="subscribe-to-show">
                <div className="shows-selector">
                    <Autocomplete
                        multiple={true}
                        autoHighlight={true}
                        filterSelectedOptions={true}
                        disableCloseOnSelect={true}
                        options={unsubscribedShows}
                        loading={allShowsLoading}
                        value={selectedShows}
                        onChange={(event, value): void => setSelectedShows(value)}
                        getOptionLabel={(option): string => option.title}
                        renderInput={(params): JSX.Element => (
                            <TextField {...params} label="Select Show(s)" variant="outlined" />
                        )}
                    />
                </div>
                <ButtonGroup className="buttons" buttons={buttons} />
            </div>
            <div className="subscribed-shows">
                {userSubscriptionsLoading ? (
                    <ComponentLoading />
                ) : (
                    subscribedShows.map((sub) => (
                        <div key={sub.id} className="subscribed-show">
                            <span
                                className="material-icons clickable"
                                onClick={(): Promise<void> => handleUnsubscribeClicked(sub)}
                            >
                                clear
                            </span>
                            {sub.title}
                        </div>
                    ))
                )}
            </div>
        </Panel>
    );
};

export default ManageSubscriptions;
