import React, { useReducer } from 'react';
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
            <Actions className="homepage-actions" />
        </div>
    );
};

export default withEpisodesSelectedContext(HomePage);
