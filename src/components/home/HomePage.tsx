import React, { useReducer } from 'react';
import DateSelector from '../dateSelector/DateSelector';
import monthReducer from '../../reducers/monthReducer';
import Calendar from '../calendar';
import Actions from './Actions';
import { withEpisodesSelectedContext } from '../../HoC/withEpisodesSelectedContext';

const HomePage: React.FC = (): JSX.Element => {
    const [date, updateDateDispatch] = useReducer(monthReducer, new Date());
    const props = { date, updateDateDispatch };

    return (
        <div>
            <DateSelector {...props} />
            <Calendar date={date} />
            <Actions />
        </div>
    );
};

export default withEpisodesSelectedContext(HomePage);
