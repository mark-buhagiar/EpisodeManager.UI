import React from 'react';
import withAuthentication from '../../HoC/withAuthenticationRequired';
import withAuthorization from '../../HoC/withAuthorizationRequired';
import Permissions from '../../models/enums/Permissions';
import Actions from './Actions';
import FeedParserHistory from './FeedParserHistory';

const AdminPage: React.FC = (): JSX.Element => {
    return (
        <>
            <div className="title">Admin</div>
            <Actions />
            <FeedParserHistory />
        </>
    );
};

export default withAuthentication(withAuthorization(AdminPage, [Permissions.READ_ADMIN, Permissions.EXECUTE_ADMIN]));
