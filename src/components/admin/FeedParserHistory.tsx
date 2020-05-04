import React, { useState } from 'react';
import * as feedParserApi from '../../api/feedParserApi';
import ParseHistoryListing from '../../models/ParseHistoryListing';
import DateRange from '../common/DateRange';
import Panel from '../common/panel';
import FeedParserHistoryItem from './FeedParserHistoryItem';
import './FeedParserHistory.scss';

const FeedParserHistory: React.FC = (): JSX.Element => {
    const today = new Date();
    const [parseHistoryItems, setParseHistoryItems] = useState<ParseHistoryListing[]>([]);

    async function handleDateRangeChanged(startDate: Date, endDate: Date): Promise<void> {
        const feedParserHistory = await feedParserApi.getParseHistoryBetweenDates(startDate, endDate);
        setParseHistoryItems(feedParserHistory);
    }

    const panelActions = (
        <DateRange initialStartDate={today} initialEndDate={today} onDateRangeChanged={handleDateRangeChanged} />
    );

    return (
        <Panel title="Feed Parser History" panelActions={panelActions}>
            {parseHistoryItems
                .sort((a, b) => b.lastSyncedOn.getTime() - a.lastSyncedOn.getTime())
                .map((parseHistoryItem) => (
                    <FeedParserHistoryItem key={parseHistoryItem.id} parseHistoryItem={parseHistoryItem} />
                ))}
        </Panel>
    );
};

export default FeedParserHistory;
