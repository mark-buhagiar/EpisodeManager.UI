import React, { useReducer } from 'react';
import withAuthenticationRequired from '../../HoC/withAuthenticationRequired';
import { withEpisodeActionContext } from '../../HoC/withEpisodeActionContext';
import { withEpisodesSelectedContext } from '../../HoC/withEpisodesSelectedContext';
import monthReducer from '../../reducers/monthReducer';
import Calendar from '../calendar';
import DateSelector from '../dateSelector/DateSelector';
import Actions from './Actions';
import './HomePage.scss';

const HomePage: React.FC = (): JSX.Element => {
    const [date, updateDateDispatch] = useReducer(monthReducer, new Date());
    const props = { date, updateDateDispatch };

    return (
        <div>
            <DateSelector {...props} />
            <Calendar date={date} />
            <Actions className="homepage-actions special-actions" />
        </div>
    );
};

export default withAuthenticationRequired(withEpisodesSelectedContext(withEpisodeActionContext(HomePage)));
