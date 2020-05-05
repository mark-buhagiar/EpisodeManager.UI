import React, { useState } from 'react';
import * as feedParserApi from '../../../api/feedParserApi';
import ParseHistoryListing from '../../../models/ParseHistoryListing';
import DateRange from '../../common/DateRange';
import Panel from '../../common/panel';
import ComponentLoading from '../../loading/ComponentLoading';
import './FeedParserHistory.scss';
import FeedParserHistoryItem from './FeedParserHistoryItem';

const FeedParserHistory: React.FC = (): JSX.Element => {
    const today = new Date();
    const [parseHistoryItems, setParseHistoryItems] = useState<ParseHistoryListing[]>([]);
    const [loading, setIsLoading] = useState(false);

    async function handleDateRangeChanged(startDate: Date, endDate: Date): Promise<void> {
        setIsLoading(true);
        const feedParserHistory = await feedParserApi.getParseHistoryBetweenDates(startDate, endDate);
        setParseHistoryItems(feedParserHistory);
        setIsLoading(false);
    }

    const panelActions = (
        <DateRange initialStartDate={today} initialEndDate={today} onDateRangeChanged={handleDateRangeChanged} />
    );

    const body = (): React.ReactNode => {
        if (loading) {
            return <ComponentLoading />;
        } else if (parseHistoryItems.length === 0) {
            return <span className="no-results">No Feed Parser Data Available</span>;
        } else {
            return parseHistoryItems
                .sort((a, b) => b.lastSyncedOn.getTime() - a.lastSyncedOn.getTime())
                .map((parseHistoryItem) => (
                    <FeedParserHistoryItem key={parseHistoryItem.id} parseHistoryItem={parseHistoryItem} />
                ));
        }
    };

    return (
        <Panel title="Feed Parser History" panelActions={panelActions}>
            {body()}
        </Panel>
    );
};

export default FeedParserHistory;
