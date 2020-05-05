import React from 'react';
import withAuthentication from '../../HoC/withAuthenticationRequired';
import withAuthorization from '../../HoC/withAuthorizationRequired';
import Permissions from '../../models/enums/Permissions';
import Actions from './actions/Actions';
import FeedParserHistory from './feedParserHistory/FeedParserHistory';
import DailyBreakdown from './dailyBreakdown/DailyBreakdown';
import LifetimeStatistics from './lifetimeStatistics/LifetimeStatistics';

const AdminPage: React.FC = (): JSX.Element => {
    return (
        <>
            <div className="title">Admin</div>
            <Actions />
            <LifetimeStatistics />
            <FeedParserHistory />
            <DailyBreakdown />
        </>
    );
};

export default withAuthentication(withAuthorization(AdminPage, [Permissions.READ_ADMIN, Permissions.EXECUTE_ADMIN]));
