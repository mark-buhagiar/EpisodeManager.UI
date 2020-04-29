import React from 'react';
import withAuthentication from '../../HoC/withAuthenticationRequired';
import withAuthorization from '../../HoC/withAuthorizationRequired';
import Permissions from '../../models/enums/Permissions';

const AdminPage: React.FC = (): JSX.Element => {
    return <>Admin Page!</>;
};

export default withAuthentication(withAuthorization(AdminPage, [Permissions.READ_ADMIN]));
