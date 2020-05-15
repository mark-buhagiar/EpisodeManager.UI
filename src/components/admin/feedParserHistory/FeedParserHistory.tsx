import React, { useState } from 'react';
import * as feedParserApi from '../../../api/feedParserApi';
import ParseHistoryListing from '../../../models/ParseHistoryListing';
import DateRange from '../../common/DateRange';
import Panel from '../../common/panel';
import ComponentLoading from '../../loading/ComponentLoading';
import './FeedParserHistory.scss';
import FeedParserHistoryItem from './FeedParserHistoryItem';
import ComponentError from '../../error/ComponentError';

const FeedParserHistory: React.FC = (): JSX.Element => {
    const today = new Date();
    const [parseHistoryItems, setParseHistoryItems] = useState<ParseHistoryListing[]>([]);
    const [loading, setIsLoading] = useState(false);
    const [hasErrored, setHasErrored] = useState(false);

    async function handleDateRangeChanged(startDate: Date, endDate: Date): Promise<void> {
        setIsLoading(true);
        try {
            const feedParserHistory = await feedParserApi.getParseHistoryBetweenDates(startDate, endDate);
            setParseHistoryItems(feedParserHistory);
        } catch (ex) {
            setHasErrored(true);
        }
        setIsLoading(false);
    }

    const panelActions = (
        <DateRange initialStartDate={today} initialEndDate={today} onDateRangeChanged={handleDateRangeChanged} />
    );

    const body = (): React.ReactNode => {
        if (loading) {
            return <ComponentLoading />;
        } else if (hasErrored) {
            return <ComponentError />;
        } else if (parseHistoryItems.length === 0) {
            return <span className="no-results">No Feed Parser Data Available</span>;
        } else {
            return parseHistoryItems
                .sort(
                    (a: ParseHistoryListing, b: ParseHistoryListing) =>
                        b.lastSyncedOn.getTime() - a.lastSyncedOn.getTime(),
                )
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
