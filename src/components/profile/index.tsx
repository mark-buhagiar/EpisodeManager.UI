import React from 'react';
import ManageSubscriptions from './ManageSubscriptions';
import withAuthenticationRequired from '../../HoC/withAuthenticationRequired';

const ProfilePage: React.FC = (): JSX.Element => {
    return (
        <>
            <div className="title">Profile</div>
            <ManageSubscriptions />
        </>
    );
};

export default withAuthenticationRequired(ProfilePage);
