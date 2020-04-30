import React from 'react';
import ManageSubscriptions from './ManageSubscriptions';
import ManagePreferences from './ManagePreferences';
import withAuthenticationRequired from '../../HoC/withAuthenticationRequired';

const ProfilePage: React.FC = (): JSX.Element => {
    return (
        <>
            <div className="title">Profile</div>
            <ManagePreferences />
            <ManageSubscriptions />
        </>
    );
};

export default withAuthenticationRequired(ProfilePage);
