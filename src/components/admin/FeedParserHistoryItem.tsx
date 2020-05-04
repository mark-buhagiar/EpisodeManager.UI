import {
    Divider,
    ExpansionPanel,
    ExpansionPanelActions,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
} from '@material-ui/core';
import React, { useState } from 'react';
import * as feedParserApi from '../../api/feedParserApi';
import ParseHistoryDetails from '../../models/ParseHistoryDetails';
import ParseHistoryListing from '../../models/ParseHistoryListing';
import { ButtonProps } from '../common/button/Button';
import ButtonGroup from '../common/button/ButtonGroup';
import ComponentLoading from '../loading/ComponentLoading';
import { toDateAndTimeFormat } from '../../helpers/dateHelpers';
import moment from 'moment';

interface Props {
    parseHistoryItem: ParseHistoryListing;
}

const FeedParserHistoryItem: React.FC<Props> = ({ parseHistoryItem: summary }: Props): JSX.Element => {
    const [details, setDetails] = useState<ParseHistoryDetails | null>(null);
    const [forceResyncEnabled, setForceResyncEnabled] = useState<boolean>(false);

    async function handleForceResyncClicked(): Promise<void> {
        if (details === null) return;
        setForceResyncEnabled(false);
        await feedParserApi.forceSyncParseHistory(details.id);
        setForceResyncEnabled(true);
    }

    const buttons = [
        { label: 'Force Re-sync', onClick: handleForceResyncClicked, enabled: forceResyncEnabled },
    ] as ButtonProps[];

    async function handlePanelExpansion(event: React.ChangeEvent<{}>, expanded: boolean): Promise<void> {
        if (!expanded) return;
        if (details !== null) return; // this is a re-expansion

        setDetails(await feedParserApi.getParseHistoryDetails(summary.id));
        setForceResyncEnabled(true);
    }

    return (
        <ExpansionPanel TransitionProps={{ unmountOnExit: true }} onChange={handlePanelExpansion}>
            <ExpansionPanelSummary expandIcon={<span className="material-icons">expand_more</span>}>
                <div className="parse-history-summary">
                    <div className="date" title="Last synced on">
                        {toDateAndTimeFormat(moment(summary.lastSyncedOn))}
                    </div>
                    <div className="episode-count" title="Episode count">
                        {summary.episodeCount}
                    </div>
                    <div className="status">{summary.success ? 'Success' : 'Failure'}</div>
                </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <div className="parse-history-details">
                    {details === null ? (
                        <ComponentLoading />
                    ) : (
                        <ul>
                            {details.episodeTitles
                                .sort((a, b) => (a > b ? 1 : -1))
                                .map((title) => (
                                    <li key={title}>{title}</li>
                                ))}
                        </ul>
                    )}
                </div>
            </ExpansionPanelDetails>
            <Divider />
            <ExpansionPanelActions>
                <ButtonGroup buttons={buttons} />
            </ExpansionPanelActions>
        </ExpansionPanel>
    );
};

export default FeedParserHistoryItem;
